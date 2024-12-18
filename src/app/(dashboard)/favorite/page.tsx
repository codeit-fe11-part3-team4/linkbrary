"use client";

import { useAuth } from "@/utils/AuthContext";

// const AuthStatus = () => {
//   const { accessToken, user } = useAuth();

//   return (
//     <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
//       <h3>로그인 상태</h3>
//       {accessToken ? (
//         <>
//           <p style={{ color: "green" }}>✅ 로그인됨</p>
//           {user ? <p>사용자 이메일: {user.email}</p> : <p>사용자 정보 없음</p>}
//           {user ? <p>사용자 닉네임: {user.name}</p> : <p>사용자 정보 없음</p>}
//         </>
//       ) : (
//         <p style={{ color: "red" }}>❌ 로그아웃 상태입니다.</p>
//       )}
//     </div>
//   );
// };

// export default AuthStatus;

export default function Favorite() {
  const { accessToken } = useAuth();

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      {accessToken ? (
        <div>{/* 카드 리스트 컴포넌트 */}</div>
      ) : (
        <div className="text-center mt-8 text-lg font-medium">
          로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { getFavorites } from "@/api/api"; // 즐겨찾기 링크를 가져오는 API

// export default function Favorite() {
//   const { accessToken, user } = useAuth(); // 로그인 상태 확인
//   const [favoriteLinks, setFavoriteLinks] = useState<any[]>([]); // 즐겨찾기 링크 상태
//   const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

//   useEffect(() => {
//     // 로그인된 상태에서만 즐겨찾기 링크를 가져옴
//     if (accessToken && user) {
//       const fetchFavoriteLinks = async () => {
//         setIsLoading(true); // 로딩 시작
//         try {
//           const links = await getFavorites(); // 즐겨찾기 링크 데이터를 API에서 받아옴
//           setFavoriteLinks(links); // 데이터 설정
//         } catch (error) {
//           console.error("즐겨찾기 링크를 불러오는 데 실패했습니다:", error);
//           setFavoriteLinks([]); // 오류가 나면 빈 배열로 처리
//         } finally {
//           setIsLoading(false); // 로딩 완료
//         }
//       };

//       fetchFavoriteLinks();
//     }
//   }, [accessToken, user]);

//   return (
//     <div>
//       <div className="w-full bg-[#F0F6FF] pb-[60px]">
//         <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
//       </div>
//       {user ? (
//         // 로그인 상태일 때
//         <div>
//           {isLoading ? (
//             <div className="text-center mt-8 text-lg font-medium">로딩 중...</div>
//           ) : favoriteLinks.length > 0 ? (
//             <div>
//               {favoriteLinks.map((link, index) => (
//                 <div key={index} className="favorite-card">
//                   <h3>{link.title}</h3>
//                   <p>{link.url}</p>
//                   {/* 추가로 필요한 정보를 출력 */}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center mt-8 text-lg font-medium">
//               즐겨찾기된 링크가 없습니다.
//             </div>
//           )}
//         </div>
//       ) : (
//         // 로그인되지 않은 상태일 때
//         <div className="text-center mt-8 text-lg font-medium">
//           로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
//         </div>
//       )}
//     </div>
//   );
// }
