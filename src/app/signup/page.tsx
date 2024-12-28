"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./signupPage.module.css";
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
    <div className={styles.signupForm}>
      <Link href="/" passHref>
        <Image
          src="/icons/linkbrary_logo.svg"
          alt="Linkbrary Logo"
          width={210}
          height={38}
          priority
          style={{ cursor: "pointer" }}
        />
      </Link>

      <p>
        이미 회원이신가요?{" "}
        <Link href="/login" style={{ textDecoration: "underline" }}>
          로그인 하기
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="이메일 입력"
            className={styles.input}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>

        {/* 이름 입력 */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            className={styles.input}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className={`${styles.formGroup} ${styles.passwordInputGroup}`}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호 입력"
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleButton}
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
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className={`${styles.formGroup} ${styles.passwordInputGroup}`}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              placeholder="비밀번호 확인 입력"
              className={styles.input}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className={styles.toggleButton}
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
            <p className={styles.error}>{passwordMatchError}</p>
          )}
        </div>
        {signupError && <p className={styles.error}>{signupError}</p>}
        {/* 회원가입 버튼 */}
        <button type="submit" className={styles.signupButton}>
          회원가입
        </button>
      </form>
    </div>
  );
}
