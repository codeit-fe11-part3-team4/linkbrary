'use client';

import { getFavorites } from '@/api/api';
import Card from '@/components/Card';
import Pagination from '@/components/Pagenation';
import { useAuth } from '@/utils/AuthContext';
import { useEffect, useState } from 'react';

export default function Favorite() {
  const { accessToken } = useAuth();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // 한 페이지에 표시할 카드 개수

  useEffect(() => {
    // 총 즐겨찾기 개수를 가져오는 API 호출
    const fetchTotalPages = async () => {
      if (!accessToken) return;

      try {
        const data = await getFavorites('11-4', 1, itemsPerPage); // 첫 페이지 데이터 요청
        if (data && data.totalCount) {
          const totalItems = data.totalCount;
          setTotalPages(Math.ceil(totalItems / itemsPerPage)); // 전체 페이지 수 계산
        }
      } catch (error) {
        console.error('총 즐겨찾기 수를 가져오는데 실패했습니다.', error);
      }
    };

    fetchTotalPages();
  }, [accessToken]);

  const onPageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      <div className='mt-[20px] xs:mt-[40px]'>
        {accessToken ? (
          <div>
            <Card folderId={null} />
            <div className='mt-[32px] mb-[60px] md:mt-[40px] md:mb-[97px] lg:mb-[]'>
              <Pagination
                totalPageNum={totalPages}
                activePageNum={activePage}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center text-lg font-medium">
            로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
          </div>
        )}
      </div>
    </div>
  );
}
