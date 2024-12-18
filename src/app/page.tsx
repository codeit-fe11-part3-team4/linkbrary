"use client";

import React, { useState } from 'react';
import {
  postSignIn,
  postSignUp,
  getFolders,
  postFolder,
  getLinks,
  postLink,
} from '../api/api';

const APITestPage = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  type APIFunction = (...args: any[]) => Promise<unknown>; // eslint-disable-line @typescript-eslint/no-explicit-any
  type Params = Record<string, unknown>;

  const handleAPICall = async (apiFunction: APIFunction, params: Params = {}) => {
    try {
      const result = await apiFunction(...Object.values(params));
      console.log("API Result:", result);

      setResponse(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err);
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
      setResponse(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        API 테스트를 위한 코드 입니다. 차후 홈페이지 작업할 때 다 지워주세요.
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Auth API</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-32"
          onClick={() =>
            handleAPICall(postSignIn, {
              email: 'newuser@example.com',
              password: 'password123',
            })
          }
        >
          로그인
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-32 ml-4"
          onClick={() =>
            handleAPICall(postSignUp, {
              email: 'newuser@example.com',
              password: 'password123',
              name: 'Test',
            })
          }
        >
          회원가입
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Folder API</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-32"
          onClick={() => handleAPICall(getFolders)}
        >
          폴더 가져오기
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-32 ml-4"
          onClick={() => handleAPICall(postFolder, { name: 'New Folder' })}
        >
          폴더 만들기
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Link API</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-32"
          onClick={() => handleAPICall(getLinks)}
        >
          링크 가져오기
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-32 ml-4"
          onClick={() =>
            handleAPICall(postLink, {
              folderId: 804,
              url: 'https://example.com',
            })
          }
        >
          링크 만들기
        </button>
      </div>

      <div>
        <h2 >결과값</h2>
        {response && <pre >{response}</pre>}
        {error && <p >Error: {error}</p>}
      </div>
    </div>
  );
};

export default APITestPage;
