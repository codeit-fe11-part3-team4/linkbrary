'use client';

import { useRouter } from "next/navigation";
import React from "react";

const notFound = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0F6FF]">
      <span className="text-[40px] font-bold">404</span>
      <h3 className="text-[30px] mb-2">페이지를 찾을 수 없습니다.</h3>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff]"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default notFound;