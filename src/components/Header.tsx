"use client";

import "@/styles/globals.css"
import Image from "next/image";
import Logo from "../../public/icons/logo.svg";
import Profile from "../../public/icons/profile.svg";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <div className="w-full bg-[#F0F6FF] flex justify-between items-center py-[32px] px-[32.5px] md:py-[38.5px] md:px-[200px] ">
      <div>
        <Link href="/">
          <Image src={Logo} alt="로고" width={133} height={24} />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-93px h-37px border-[1px] border-solid border-[var(--primary)] rounded-[4px] text-[14px] md:w-[90px] mr-[12px] md:h-[37px] md:text-[14px] md:mr-6">
          <Link href="/favorite">
            <span className="mr-1">⭐️</span>
            <span className="font-medium">즐겨찾기</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Profile} alt="프로필 이미지" width={28} height={28} />
          <span className="text-[14px] font-medium">{user?.name || "사용자"}</span>
        </div>
      </div>
    </div>
  )
}