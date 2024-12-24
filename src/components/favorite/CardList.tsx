import { getFavorites, getLinks } from "@/api/api";
import { useEffect, useState } from "react";
import Card from "./Card";
import { CardListResponse, LinkResponse } from "@/types/api";
import Pagination from "../Pagenation";
import { useAuth } from "@/utils/AuthContext";

// TODO:
// 1) 링크, 즐겨찾기 api 호출
// 2) 페이지네이션 함수 수정

// 화면 사이즈
const getPageSize = (width: number): number => {
  if (width < 390) {
    return 9; // 모바일
  } else if (width < 768) {
    return 6; // 태블릿
  } else { 
    return 9; // PC
  }
};

// 너비 추적
const useViewport = () => {
  // const [width, setWidth] = useState(0);
  const [width, setWidth] = useState(window.innerWidth || 0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

const CardList = ({ isFavorite }: { isFavorite: boolean }) => {
  const { accessToken } = useAuth()
  const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth || 0));
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const [cards, setCards] = useState<LinkResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return; // viewportWidth의 초기 값 확인

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

   // useEffect(() => {
  //   if (pageSize === null) return;

  //   const fetchData = async () => {
  //     if (!accessToken) {
  //       setError("로그인이 필요합니다.");
  //       return;
  //     }
    
  //     try {
  //       const pageSize = getPageSize(viewportWidth);
  //       const data: CardListResponse = isFavorite
  //         ? await getFavorites(page, pageSize)
  //         : await getLinks(page, pageSize, accessToken);
    
  //       setCards(data.list);
  //       setTotalPageNum(Math.ceil(data.totalCount / pageSize));
  //     } catch (error) {
  //       console.error("에러 발생: ", error);
  //       setError("데이터를 가져오는 중 오류가 발생했습니다.");
  //       // setCards([]); 
  //       // setTotalPageNum(0);
  //     }
  //   };
    
  //   fetchData();
  // }, [page, pageSize, accessToken, isFavorite]);
  useEffect(() => {
    if (!accessToken || pageSize === null) return;
  
    const fetchData = async () => {
      try {
        const data: CardListResponse = isFavorite
          ? await getFavorites(page, pageSize)
          : await getLinks(page, pageSize, accessToken);
        
        console.log("API 응답 데이터:", data); // 개발자 도구 확인
        
        setCards(data.list);
        setTotalPageNum(Math.ceil(data.totalCount / pageSize));
      } catch (error) {
        console.error("에러 발생: ", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };
  
    fetchData();
    console.log("API 호출 상태:", { page, pageSize, accessToken, isFavorite }); // 개발자 도구 확인
  }, [page, pageSize, accessToken, isFavorite]);  
  
  // 화면 크기 변경 시 페이지 크기 업데이트
  useEffect(() => {
    if (viewportWidth > 0) {
      const newPageSize = getPageSize(viewportWidth);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    }
  }, [viewportWidth]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (error) {
    return <div>{error}</div>;
  }

  console.log("렌더링할 카드 데이터:", cards); // 개발자 도구 확인

  useEffect(() => {
    console.log("렌더링할 카드 데이터 변경됨:", cards);
  }, [cards]); // 개발자 도구 확인

  return (
    <div>
      <div>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            createdAt={new Date(card.createdAt)}
            linkId={card.id}
            url={card.url}
            imageSource={card.imageSource}
            isEditable={true} // 수정 가능 여부, 항상 true로 설정
          />
        ))}
      </div>
      <div>
        <Pagination
          totalPageNum={totalPageNum ?? 1}
          activePageNum={page}
          onPageChange={onPageChange}
          />
      </div>
    </div>
  )
}

export default CardList;