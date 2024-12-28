import { useState, useEffect } from "react";

// 화면 크기에 따른 페이지 크기 반환 함수
const getPageSize = (width: number) => {
  if (width < 768) {
    return 9; // mobile
  } else if (width < 1024) {
    return 6; // tablet
  } else {
    return 9; // pc
  }
};

// 현재 브라우저의 innerWidth와 반응형 상태, 페이지 크기를 반환하는 훅
function useViewport(initialWidth = 0) {
  const [width, setWidth] = useState(initialWidth);
  const [pageSize, setPageSize] = useState(getPageSize(initialWidth));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth); // width 상태 업데이트
      setPageSize(getPageSize(newWidth)); // pageSize 상태 업데이트
    };

    handleResize(); // 초기 상태 설정

    window.addEventListener("resize", handleResize); // 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 이벤트 리스너 제거
    };
  }, []);

  const isPC = width >= 1280;
  const isTablet = width >= 768 && width < 1280;
  const isMobile = width < 768;

  return { width, isPC, isTablet, isMobile, pageSize };
}

export default useViewport;