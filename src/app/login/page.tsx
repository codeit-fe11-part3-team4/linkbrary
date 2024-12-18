"use client";
import './loginPage.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../styles/globals.css'
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 필드 blur 이벤트
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 blur 이벤트
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    } else {
      setEmailError('');
    }
  };

  // 제출 이벤트
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      router.push('/share'); 
    }
  };

  return (
    <div className="login-form">
      <Link href="/" passHref>
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
      <p>
        회원이 아니신가요? <a href="/signup">회원 가입하기</a>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group password-input-group">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호를 입력하세요"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-button"
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
            {passwordError && <p className="error">{passwordError}</p>}
        </div>


        <button type="submit" className='login-button'>로그인</button>
      </form>

      <div className="social-login">
        <p>소셜 로그인</p>
        <div className="social-icons">
          <Image src="/icons/google.svg" alt="구글 로그인" width={40} height={40} />
          <Image src="/icons/kakao.svg" alt="카카오 로그인" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
