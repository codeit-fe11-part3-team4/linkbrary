"use client";

import React, { useState } from "react";
import { getFolders, postFolder, getLinks, postLink } from "../../api/api";
import { useAuth } from "../../utils/AuthContext";

const APITestPage = () => {
  const { login, logout } = useAuth(); // AuthContext에서 로그인 상태 관리
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type APIFunction = (...args: any[]) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Params = { [key: string]: any };

  const handleAPICall = async (apiFunction: APIFunction, params: Params = {}) => {
    setResponse(null);
    setError(null);

    try {
      const result = await apiFunction(...Object.values(params));
      setResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        API 테스트를 위한 코드입니다. 차후 홈페이지 작업할 때 다 지워주세요.
      </h1>

      {/* Auth API */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Auth API</h2>
        <div className="space-x-4">
          <button
            className="w-36 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleAPICall(login, { email: "newuser@example.com", password: "password123" })}
          >
            로그인
          </button>
          <button
            className="w-36 h-10 bg-blue-500 text-white rounded hover:bg-red-600"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </section>

      {/* Folder API */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Folder API</h2>
        <div className="space-x-4">
          <button
            className="w-36 h-10 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleAPICall(getFolders)}
          >
            폴더 가져오기
          </button>
          <button
            className="w-36 h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => handleAPICall(postFolder, { name: "New Folder" })}
          >
            폴더 만들기
          </button>
        </div>
      </section>

      {/* Link API */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Link API</h2>
        <div className="space-x-4">
          <button
            className="w-36 h-10 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => handleAPICall(getLinks)}
          >
            링크 가져오기
          </button>
          <button
            className="w-36 h-10 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            onClick={() =>
              handleAPICall(postLink, {
                folderId: 804,
                url: "https://example.com",
              })
            }
          >
            링크 만들기
          </button>
        </div>
      </section>

      {/* 결과값 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">결과값</h2>
        {response && (
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {response}
          </pre>
        )}
        {error && <p className="text-red-500 font-semibold">❌ Error: {error}</p>}
      </section>
    </div>
  );
};

export default APITestPage;