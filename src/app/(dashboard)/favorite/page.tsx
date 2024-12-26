'use client';

import { getFavorites } from '@/api/api';
import Card from '@/components/Card';
import Pagination from '@/components/Pagenation';
import { LinkResponse } from '@/types/api';
import { useAuth } from '@/utils/AuthContext';
import { useEffect, useState } from 'react';
import useViewport from "@/utils/useViewport";

export default function Favorite() {
  const { accessToken } = useAuth();
  const { pageSize, width } = useViewport();

  const [links, setLinks] = useState<LinkResponse[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [activePage, setActivePage] = useState(1);

  // useEffect(() => {
  //   if (accessToken) {
  //     const fetchFavorites = async () => {
  //       try {
  //         console.log('즐겨찾기 fetch:', { activePage, pageSize }); // console.log
  //         const response = await getFavorites('11-4', activePage, pageSize);

  //         console.log('API 응답 확인:', response); // console.log
  //         setLinks(response.list || []);
  //         setTotalItems(response.totalCount || 0);
  //       } catch (error) {
  //         console.error('즐겨찾기 데이터를 불러오는 중 오류 발생:', error);
  //       }
  //     };

  //     fetchFavorites();
  //   }
  // }, [accessToken, activePage, pageSize]);

  // API 호출 함수
  const fetchFavorites = async (page: number, size: number) => {
    try {
      console.log('즐겨찾기 패칭:', { page, size }); // 디버깅용 콘솔
      const response = await getFavorites('11-4', page, pageSize);

      console.log('API 응답:', response); // 디버깅용 콘솔
      setLinks(response.list || []); // 현재 페이지의 데이터
      setTotalItems(response.totalCount || 0); // 전체 데이터 개수
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  // 페이지 번호나 페이지 크기 변경 시 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      console.log(pageSize, '페이지사이즈')
      fetchFavorites(activePage, pageSize);
    }
  }, [accessToken, activePage, pageSize]);

  const totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 계산

  const onPageChange = (pageNumber: number) => {
    console.log('페이지 변경 확인:', pageNumber); // 디버깅용 콘솔
    setActivePage(pageNumber); // 페이지 번호 업데이트
  };

  console.log('상태 확인:', { links, totalItems, activePage, totalPages, pageSize, width }); // 디버깅용 콘솔

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      <div className='mt-[20px] xs:mt-[40px]'>
        {accessToken ? (
          <div>
            <Card folderId={null} links={links} />
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
