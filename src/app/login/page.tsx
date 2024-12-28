"use client";
import styles from './loginPage.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import '../../styles/globals.css';
import Link from "next/link";
import { useAuth } from '../../utils/AuthContext';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!emailError && !passwordError && email && password) {
      try {
        await login(email, password); 
        window.location.href = '/';
      } catch (error) {
        console.error('로그인 실패:', error);
        setLoginError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0F6FF] font-sans">
      <div className="w-[325px] sm:w-[400px] bg-[#F0F6FF] rounded-[8px] text-center p-[24px] border-none">
        <Link href="/" passHref className='flex justify-center mb-[16px]'>
          <div>
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
          회원이 아니신가요? 
          <Link href="/signup" className="ml-[8px] font-semibold text-[#6D6AFE] underline">
            회원 가입하기
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-[30px]">
          <div className="mb-[24px] text-left">
            <label htmlFor="email" className="block mb-[12px] text-[#333] text-[14px]">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="이메일을 입력하세요"
              autoComplete="off" 
              className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 
                ${emailError ? 'border-[#ff5b56]' : 'border-[#CCD5E3]'} 
                rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}      
            />
            {emailError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{emailError}</p>}
          </div>
          <div className="mb-[30px] text-left relative">
            <label htmlFor="password" className="block mb-[12px] text-[#333] text-[14px]">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                placeholder="비밀번호를 입력하세요"
                className={`w-full h-[60px] py-[18px] px-[15px] border-[1px] 
                  ${passwordError ? 'border-[#ff5b56]' : 'border-[#CCD5E3]'} 
                  rounded-[8px] text-[16px] focus:border-[#6D6AFE] focus:outline-none`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-[10px] -translate-y-1/2 bg-none border-none cursor-pointer flex items-center justify-center p-0"
                aria-label="비밀번호 보기/숨기기"
              >
                <Image
                  src={showPassword ? "/icons/ic_eye_off.svg" : "/icons/ic_eye_on.svg"}
                  alt="비밀번호 보기/숨기기"
                  width={16} 
                  height={16}
                />
              </button>
            </div>
            {passwordError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{passwordError}</p>}
          </div>

          <button type="submit" className="w-full h-[53px] text-[18px] font-bold rounded-[8px]
            bg-gradient-to-r from-[#7f7fff] to-[#3bb6ff] border-none text-white cursor-pointer hover:from-[#6f6fff] hover:to-[#32aaff]">
            로그인
          </button>
          {loginError && <p className="text-[#ff5b56] text-[12px] mt-[6px]">{loginError}</p>}
        </form>

        <div className="flex items-center justify-between mt-[32px] text-center bg-[#E7EFFB] border-[1px] border-[#CCD5E3] rounded-[8px] py-[12px] px-[24px]">
          <p className='text-[14px]'>소셜 로그인</p>
          <div className="flex gap-[16px]">
            <Image src="/icons/google.svg" alt="구글 로그인" width={40} height={40} />
            <Image src="/icons/kakao.svg" alt="카카오 로그인" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
