'use client';

import React, { useState } from 'react';
import { getFolders, postFolder, getLinks, postLink, putFavoriteLink } from '../../api/api';
import { useAuth } from '../../utils/AuthContext';

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
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">
        API 테스트를 위한 코드입니다. 차후 홈페이지 작업할 때 다 지워주세요.
      </h1>

      {/* Auth API */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Auth API</h2>
        <div className="space-x-4">
          <button
            className="h-10 w-36 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() =>
              handleAPICall(login, { email: 'newuser@example.com', password: 'password123' })
            }
          >
            로그인
          </button>
          <button
            className="hover:bg-red-600 h-10 w-36 rounded bg-blue-500 text-white"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </section>

      {/* Folder API */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Folder API</h2>
        <div className="space-x-4">
          <button
            className="h-10 w-36 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={() => handleAPICall(getFolders)}
          >
            폴더 가져오기
          </button>
          <button
            className="h-10 w-36 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => handleAPICall(postFolder, { name: 'New Folder' })}
          >
            폴더 만들기
          </button>
        </div>
      </section>

      {/* Link API */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Link API</h2>
        <div className="space-x-4">
          <button
            className="h-10 w-36 rounded bg-purple-500 text-white hover:bg-purple-600"
            onClick={() => handleAPICall(getLinks)}
          >
            링크 가져오기
          </button>
          <button
            className="h-10 w-36 rounded bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() =>
              handleAPICall(postLink, {
                folderId: 804,
                url: 'https://example.com',
              })
            }
          >
            링크 만들기
          </button>
          <button
            className="h-10 w-36 rounded bg-pink-500 text-white hover:bg-pink-600"
            onClick={() => handleAPICall(putFavoriteLink, { linkId: 941, favorite: true })}
          >
            즐겨찾기 등록
          </button>
        </div>
      </section>

      {/* 결과값 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">결과값</h2>
        {response && (
          <pre className="overflow-auto rounded-md bg-gray-100 p-4 text-sm">{response}</pre>
        )}
        {error && <p className="text-red-500 font-semibold">❌ Error: {error}</p>}
      </section>
    </div>
  );
};

export default APITestPage;
