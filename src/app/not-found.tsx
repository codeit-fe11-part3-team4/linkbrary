'use client';

import { useRouter } from "next/navigation";
import React from "react";
import NotFoundImg from "../../public/icons/404.svg";
import Image from "next/image";

const notFound = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0F6FF]">
      <Image alt="404" src={NotFoundImg} width={752} height={436} className="mb-4" />  
      <h3 className=" mb-4 text-[24px] text-[#9FA6B2]">페이지를 찾을 수 없습니다.</h3>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="w-[350px] h-[53px] rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[18px] text-[#ffffff] font-semibold"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default notFound;