"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./signupPage.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // 이름 상태 추가
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && !passwordError && !passwordMatchError && name) {
      alert("가입이 완료되었습니다!");
      router.push("/login");
    }
  };

  return (
    <div className="signup-form">
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
        이미 회원이신가요?{" "}
        <Link href="/login" style={{ textDecoration: "underline" }}>
          로그인 하기
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="이메일 입력"
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        {/* 이름 입력 */}
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="form-group password-input-group">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호 입력"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-button"
            >
              <Image
                src={
                  showPassword ? "/icons/ic_eye_off.svg" : "/icons/ic_eye_on.svg"
                }
                alt="비밀번호 보기/숨기기"
                width={16}
                height={16}
              />
            </button>
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group password-input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              placeholder="비밀번호 확인 입력"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-button"
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
          {passwordMatchError && <p className="error">{passwordMatchError}</p>}
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
}
