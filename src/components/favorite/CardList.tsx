import { getFavorites, getLinks } from "@/api/api";
import { useEffect, useState } from "react";
import Card from "./Card";
import { LinkResponse } from "@/types/api";
import Pagination from "../Pagenation";

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
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

const CardList = ({ isFavorite }: { isFavorite: boolean }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const [cards, setCards] = useState<LinkResponse[]>([]);

  const viewportWidth = useViewport();

  // 데이터 로드 함수
  // const fetchLinks = async (currentPage: number, currentPageSize: number) => {
  //   try {
  //     const response = isFavorite
  //       ? await getFavorites(currentPage, currentPageSize)
  //       : await getLinks(currentPage, currentPageSize);

  //     setCards(response); // 카드 데이터 업데이트
  //     setTotalPageNum(Math.ceil(response.length / currentPageSize)); // 총 페이지 수 계산
  //   } catch (error) {
  //     console.error("오류 발생:", error);
  //   }
  // };
  const fetchLinks = async (currentPage: number, currentPageSize: number) => {
    try {
      const response = isFavorite
        ? await getFavorites(currentPage, currentPageSize)
        : await getLinks(currentPage, currentPageSize);

      setCards(response || []);
      setTotalPageNum(Math.ceil(response.length / currentPageSize));
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 화면 크기 변경 시 페이지 크기 업데이트
  useEffect(() => {
    if (viewportWidth > 0) {
      const newPageSize = getPageSize(viewportWidth);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    }
  }, [viewportWidth]);

  // 페이지 또는 페이지 크기 변경 시 데이터 로드
  useEffect(() => {
    if (pageSize !== null) {
      fetchLinks(page, pageSize);
    }
  }, [page, pageSize, isFavorite]);

  // 페이지 변경 처리
  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  
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