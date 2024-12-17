"use client";

import React, { useState } from "react";
import {
  getFolders,
  postFolder,
  getLinks,
  postLink,
} from "../api/api";
import { useAuth } from "../utils/AuthContext";

const APITestPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { login, logout, accessToken } = useAuth(); // AuthContext에서 로그인 상태 관리
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  type APIFunction = (...args: any[]) => Promise<any>;
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
    <div style={{ padding: "2rem" }}>
      <h1>API 테스트 페이지</h1>
      <p>이 페이지는 개발용으로만 사용됩니다. 차후 삭제해주세요.</p>

      {/* Auth API */}
      <section>
        <h2>🛠 Auth API</h2>
        <div>
          <button
            style={{ width: "150px", height: "40px", marginRight: "10px" }}
            onClick={() => handleAPICall(login, { email: "newuser@example.com", password: "password123" })}
          >
            로그인
          </button>
          <button
            style={{ width: "150px", height: "40px" }}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </section>

      {/* Folder API */}
      <section>
        <h2>📁 Folder API</h2>
        <div>
          <button
            style={{ width: "150px", height: "40px", marginRight: "10px" }}
            onClick={() => handleAPICall(getFolders)}
          >
            폴더 가져오기
          </button>
          <button
            style={{ width: "150px", height: "40px" }}
            onClick={() => handleAPICall(postFolder, { name: "New Folder" })}
          >
            폴더 만들기
          </button>
        </div>
      </section>

      {/* Link API */}
      <section>
        <h2>🔗 Link API</h2>
        <div>
          <button
            style={{ width: "150px", height: "40px", marginRight: "10px" }}
            onClick={() => handleAPICall(getLinks)}
          >
            링크 가져오기
          </button>
          <button
            style={{ width: "150px", height: "40px" }}
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
        <h2>📝 결과값</h2>
        {response && (
          <pre style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "5px" }}>
            {response}
          </pre>
        )}
        {error && <p style={{ color: "red", fontWeight: "bold" }}>❌ Error: {error}</p>}
      </section>
    </div>
  );
};

export default APITestPage;
