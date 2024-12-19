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
        const users = await getUsers();
        if (users.length > 0) {
          setUserEmail(users[0].email);
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
    document.cookie = "accessToken=; Max-Age=0; path=/";
    setUserEmail(null);
    router.push("/");
  };

  return (
    <div className={styles["login-container"]}>
      {userEmail ? (
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