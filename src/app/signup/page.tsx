"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { postSignUp } from "../../api/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!emailError && !passwordError && !passwordMatchError && name) {
      try {
        await postSignUp(email, password, name);
        alert("회원가입이 완료되었습니다!");
        window.location.href = "/login"; 
      } catch (error) {
        console.error("회원가입 실패:", error);
        setSignupError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0F6FF] font-sans">
      <div className="w-[325px] sm:w-[400px] bg-[#F0F6FF] rounded-[8px] text-center p-[24px] border-none">
        <Link href="/" passHref className="flex justify-center mb-[16px]">
          <div style={{ cursor: "pointer" }}>
            <Image
              src="/icons/linkbrary_logo.svg"
              alt="Linkbrary Logo"
              width={210}
              height={38}
              priority
            />
          </div>
        </Link>
        <p className="text-[16px]">
          이미 회원이신가요?
          <Link href="/login" className="ml-[8px] font-semibold text-[#6D6AFE] underline">
            로그인 하기
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <div className="mt-[30px] mb-[24px] text-left">
            <label htmlFor="email" className="block mb-[12px] text-[#333] text-[14px]">
              이메일
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="이메일 입력"
              autoComplete="off" 
              className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 
                ${emailError ? 'border-[#ff5b56]' : 'border-[#CCD5E3]'} 
                rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}
            />
            {emailError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{emailError}</p>}
          </div>

          {/* 이름 입력 */}
          <div className="mb-[24px] text-left relative">
            <label htmlFor="name" className="block mb-[12px] text-[#333] text-[14px]">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 'border-[#CCD5E3]
                rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-[24px] text-left relative">
            <label htmlFor="password" className="block mb-[12px] text-[#333] text-[14px]">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                placeholder="비밀번호 입력"
                className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 
                  ${passwordError ? 'border-[#ff5b56]' : 'border-[#CCD5E3]'} 
                  rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-[10px] -translate-y-1/2 bg-none border-none cursor-pointer flex items-center justify-center p-0"
              >
                <Image
                  src={
                    showPassword
                      ? "/icons/ic_eye_off.svg"
                      : "/icons/ic_eye_on.svg"
                  }
                  alt="비밀번호 보기/숨기기"
                  width={16}
                  height={16}
                />
              </button>
            </div>
            {passwordError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{passwordError}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-[30px] text-left relative">
            <label htmlFor="confirmPassword" className="block mb-[12px] text-[#333] text-[14px]">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
                placeholder="비밀번호 확인 입력"
                className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 
                  ${passwordMatchError ? 'border-[#ff5b56]' : 'border-[#CCD5E3]'} 
                  rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
               className="absolute top-1/2 right-[10px] -translate-y-1/2 bg-none border-none cursor-pointer flex items-center justify-center p-0"
              >
                <Image
                  src={
                    showConfirmPassword
                      ? "/icons/ic_eye_off.svg"
                      : "/icons/ic_eye_on.svg"
                  }
                  alt="비밀번호 보기/숨기기"
                  width={16}
                  height={16}
                />
              </button>
            </div>
            {passwordMatchError && (
              <p className="text-[#ff5b56] text-[12px] mt-[6px]">{passwordMatchError}</p>
            )}
          </div>
          {signupError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{signupError}</p>}
          {/* 회원가입 버튼 */}
          <button type="submit" className="w-full h-[53px] text-[18px] font-bold rounded-[8px]
            bg-gradient-to-r from-[#7f7fff] to-[#3bb6ff] border-none text-white cursor-pointer hover:from-[#6f6fff] hover:to-[#32aaff]">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
