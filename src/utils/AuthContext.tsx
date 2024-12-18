"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { postSignIn, getUser } from "../api/api";
import { UserResponse } from "../types/api";

interface AuthContextType {
  accessToken: string | null;
  user: UserResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);

  // 새로고침 시 로컬 스토리지에서 accessToken와 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (token) setAccessToken(token);
    if (savedUser) setUser(JSON.parse(savedUser) as UserResponse);
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await postSignIn(email, password);

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        setAccessToken(response.accessToken);

        const userData = await getUser();
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          console.error("유저데이터를 불러오는데 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 실패패:", error);
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
    throw new Error("useAuth는 AuthProvider 내에서 사용하세요.");
  }
  return context;
};
