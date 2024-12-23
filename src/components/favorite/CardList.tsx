import { getFavorites, getLinks } from "@/api/api";
import { useEffect, useState } from "react";
// import link from "./link";
// import { LinkResponse } from "@/types/api";
// import Pagination from "../Pagenation";
// import { useAuth } from "@/utils/AuthContext";
// import axios from "axios";

// interface LinkResponse {
//   imageSource: any;
//   id: number;
//   folderId: string;
//   url: string;
//   title: string;
//   description: string;
//   createdAt: Date;
//   updatedAt: string;
// }

interface LinkResponse {
  id: number;
  title: string;
  imageSource: string;
}

// TODO:
// 1) 링크, 즐겨찾기 api 호출
// 2) 페이지네이션 함수 구현
// 3) 로그인 토큰

// 화면 사이즈
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

const CardList = () => {
  // const { accessToken, logout } = useAuth()
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState<number | null>(null);
  // const [totalPageNum, setTotalPageNum] = useState<number>(0);
  // const [links, setlinks] = useState<LinkResponse[]>([]);
  // const [error, setError] = useState<string | null>(null);

  const [links, setLinks] = useState<LinkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  // const viewportWidth = useViewport();

  // const refreshAccessToken = async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refreshToken"); // 리프레시 토큰 저장 위치
  //     if (!refreshToken) {
  //       throw new Error("Refresh token not available");
  //     }

  //     const response = await axiosInstance.post("/teamId/auth/refresh", {
  //       refreshToken,
  //     });

  //     const newAccessToken = response.data.accessToken;
  //     localStorage.setItem("accessToken", newAccessToken);
  //     return newAccessToken;
  //   } catch (error) {
  //     console.error("토큰 갱신 실패:", error);
  //     logout(); // 토큰 갱신 실패 시 로그아웃
  //     throw new Error("토큰 갱신 실패");
  //   }
  // };

  // // 401 응답을 처리하는 인터셉터 설정
  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     if (error.response?.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       try {
  //         const newAccessToken = await refreshAccessToken();
  //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //         return axiosInstance(originalRequest); // 원래 요청을 재시도
  //       } catch (refreshError) {
  //         return Promise.reject(refreshError);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // const fetchData = async () => {
  //   if (!accessToken) {
  //     setError("로그인이 필요합니다."); // 로그아웃 상태 처리
  //     return;
  //   }

  //   try {
  //     const pageSize = getPageSize(viewportWidth);
  //     const response = isFavorite
  //       ? await getFavorites(page, pageSize, accessToken)
  //       : await getLinks(page, pageSize, accessToken);

  //     setlinks(response); // API 응답의 데이터 설정
  //     setTotalPageNum(Math.ceil(response.totalCount / pageSize));
  //   } catch (error) {
  //     console.error("에러 발생:", error);
  //     setError("데이터를 가져오는 중 오류가 발생습니다.");
  //     setlinks([]);
  //     setTotalPageNum(0);
  //   }
  // };

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await getLinks(1, 9, '');
        setLinks(data.list || []);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  // // 화면 크기 변경 시 페이지 크기 업데이트
  // useEffect(() => {
  //   if (viewportWidth > 0) {
  //     const newPageSize = getPageSize(viewportWidth);
  //     if (newPageSize !== pageSize) {
  //       setPageSize(newPageSize);
  //     }
  //   }
  // }, [viewportWidth]);

  // useEffect(() => {
  //   fetchData();
  // }, [page, viewportWidth, isFavorite]);

  // const onPageChange = (newPage: number) => {
  //   setPage(newPage);
  // };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      <div>
        {links.map((link) => (
          <link
            key={link.id}
            title={link.title}
            description={link.description}
            createdAt={new Date(link.createdAt)}
            linkId={link.id}
            url={link.url}
            imageSource={link.imageSource}
            isEditable={true} // 수정 가능 여부, 항상 true로 설정
          />
        ))}
      </div>
      <div>
        {/* <Pagination
          totalPageNum={totalPageNum ?? 1}
          activePageNum={page}
          onPageChange={onPageChange}
          /> */}
      </div>
    </div>
  )
}

export default CardList;