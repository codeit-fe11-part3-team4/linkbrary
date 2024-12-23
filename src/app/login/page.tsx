"use client";
import styles from './loginPage.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import '../../styles/globals.css';
import Link from "next/link";
import { useAuth } from '@/utils/AuthContext';


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
    if (!validateEmail(email) && email.length < 1) {
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
    <div className={styles.loginForm}>
      <Link href="/" passHref>
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
      <p>
        회원이 아니신가요? <Link href="/signup">회원 가입하기</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            className={styles.input}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>
        <div className={`${styles.formGroup} ${styles.passwordInputGroup}`}>
          <label htmlFor="password" className={styles.label}>비밀번호</label>
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호를 입력하세요"
              className={styles.input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.toggleButton}
              aria-label="비밀번호 보기/숨기기"
            >
              <Image
                src={showPassword ? "/icons/ic_eye_off.svg" : "/icons/ic_eye_on.svg"}
                alt="비밀번호 보기/숨기기"
                width={16} 
                height={16}
                className={styles.toggleIcon}
              />
            </button>
          </div>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        <button type="submit" className={styles.loginButton}>로그인</button>
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>

      <div className={styles.socialLogin}>
        <p>소셜 로그인</p>
        <div className={styles.socialIcons}>
          <Image src="/icons/google.svg" alt="구글 로그인" width={40} height={40} />
          <Image src="/icons/kakao.svg" alt="카카오 로그인" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
