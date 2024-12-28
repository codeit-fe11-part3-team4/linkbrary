'use client';

import Card from '@/components/Card';
import Pagination from '@/components/Pagenation';
import { useAuth } from '@/utils/AuthContext';
import { useState } from 'react';
import useViewport from "@/utils/useViewport";
import Footer from '@/components/mainLandingPage/Footer';

export default function Favorite() {
  const { accessToken } = useAuth();
  const { pageSize } = useViewport(); // 화면 크기에 따라 pageSize 계산
  const [activePageNum, setActivePageNum] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  const handlePageChange = (pageNumber: number) => {
    setActivePageNum(pageNumber);
  };

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      <div className='mt-[20px] xs:mt-[40px]'>
        {accessToken ? (
          <div>
            <Card 
              folderId={null}
              currentPage={activePageNum}
              pageSize={pageSize}
              setTotalPages={setTotalPages} // 총 페이지 수 설정 함수 전달
             />
            <div className='mt-[32px] mb-[60px] md:mt-[40px] md:mb-[97px] lg:mb-[]'>
              <Pagination
                totalPageNum={totalPages}
                activePageNum={activePageNum}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center text-lg font-medium">
            로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
