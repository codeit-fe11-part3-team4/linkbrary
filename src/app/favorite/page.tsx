"use client";

import React from "react";
import { useAuth } from "../../utils/AuthContext";

const AuthStatus = () => {
  const { accessToken, user } = useAuth();

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h3>로그인 상태</h3>
      {accessToken ? (
        <>
          <p style={{ color: "green" }}>✅ 로그인됨</p>
          {user ? <p>사용자 이메일: {user.email}</p> : <p>사용자 정보 없음</p>}
          {user ? <p>사용자 닉네임: {user.name}</p> : <p>사용자 정보 없음</p>}
        </>
      ) : (
        <p style={{ color: "red" }}>❌ 로그아웃 상태입니다.</p>
      )}
    </div>
  );
};

export default AuthStatus;
// export default function Favorite() {
//   return (
//     <div>
//       <div className="w-full bg-[#F0F6FF] pb-[60px]">
//         <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
//       </div>
//       <div>{/* 카드 */}</div>
//     </div>
//   );
// }
