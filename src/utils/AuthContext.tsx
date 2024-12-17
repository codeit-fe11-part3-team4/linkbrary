"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { postSignIn, getUser } from "../api/api";
import { UserResponse } from "../types/api";

interface AuthContextType {
  accessToken: string | null;
  user: UserResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);

  // 새로고침 시 로컬 스토리지에서 accessToken와 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");
    if (token) {
      setAccessToken(token);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser) as UserResponse);
    }
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      // 로그인 API 호출
      const response = await postSignIn(email, password);
  
      if (response.accessToken) {
        // AccessToken 저장
        localStorage.setItem("accessToken", response.accessToken);
        setAccessToken(response.accessToken);
  
        // 사용자 정보 가져오기
        const user = await getUser();
  
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        } else {
          console.error("User data not found.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용하세요");
  }
  return context;
};
