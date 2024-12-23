// import { getFavorites, getLinks } from "@/api/api";
// import { useEffect, useState } from "react";
// import Card from "./Card";
// import { LinkResponse } from "@/types/api";
// import Pagination from "../Pagenation";
// import { useAuth } from "@/utils/AuthContext";

// // TODO:
// // 1) 링크, 즐겨찾기 api 호출
// // 2) 페이지네이션 함수 구현
// // 3) 로그인 토큰

// // 화면 사이즈
// const getPageSize = (width: number): number => {
//   if (width < 390) {
//     return 9; // 모바일
//   } else if (width < 768) {
//     return 6; // 태블릿
//   } else { 
//     return 9; // PC
//   }
// };

// // 너비 추적
// const useViewport = () => {
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     const handleWindowResize = () => setWidth(window.innerWidth);
//     handleWindowResize();
//     window.addEventListener("resize", handleWindowResize);
//     return () => window.removeEventListener("resize", handleWindowResize);
//   }, []);

//   return width;
// };

// const CardList = () => {

//   return (
//     <div>
//       <div>
//         {cards.map((card) => (
//           <Card
//             key={card.id}
//             title={card.title}
//             description={card.description}
//             createdAt={new Date(card.createdAt)}
//             linkId={card.id}
//             url={card.url}
//             imageSource={card.imageSource}
//             isEditable={true} // 수정 가능 여부, 항상 true로 설정
//           />
//         ))}
//       </div>
//       <div>
//         <Pagination
//           totalPageNum={totalPageNum ?? 1}
//           activePageNum={page}
//           onPageChange={onPageChange}
//           />
//       </div>
//     </div>
//   )
// }

// export default CardList;