"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginButton.module.css";
import { getUsers } from "../../api/api";

const LoginButton = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const users = await getUsers(); // API 호출로 사용자 정보 가져오기
        if (users.length > 0) {
          setUserEmail(users[0].email); // 첫 번째 사용자의 이메일로 설정
        } else {
          setUserEmail(null);
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
        setUserEmail(null);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    document.cookie = "accessToken=; Max-Age=0; path=/"; // 쿠키 삭제로 로그아웃 처리
    setUserEmail(null); // 이메일 상태 초기화
    router.push("/"); // 홈으로 리디렉션
  };

  return (
    <div className={styles["login-container"]}>
      {userEmail ? (
        // 로그인 상태
        <>
          <button onClick={handleLogout} className={styles["logout-button"]}>
            로그아웃
          </button>
          <span className={styles["user-email"]}>{userEmail}</span>
        </>
      ) : (
        // 로그아웃 상태
        <button
          onClick={() => router.push("/login")}
          className={styles["login-button"]}
        >
          로그인
        </button>
      )}
    </div>
  );
};

export default LoginButton;