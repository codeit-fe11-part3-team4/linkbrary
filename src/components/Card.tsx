'use client';

import { getLinks, getFavorites, putFavoriteLink, getLinksByFolderId } from '@/api/api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NoImage from '../../public/images/NoImage.svg';
import starEmpty from '../../public/icons/ic_star_empty.svg';
import starFill from '../../public/icons/ic_star_fill.svg';
import { usePathname } from 'next/navigation';
import { LinkResponse } from '@/types/api';
import { formatUpdatedAt } from '@/utils/date';
import { format } from 'date-fns';
import Link from 'next/link';
import { LinkData } from '@/utils/LinkData';
import LinkKebab from './LinkPage/LinkKebab';

type CardProps = {
  folderId: number | null; // 선택된 폴더 ID
  links?: LinkResponse[]; // 부모에서 전달받은 링크 (선택적)
  searchQuery?: string; // 검색어 상태 추가
  currentPage?: number; // 현재 페이지 번호
  pageSize?: number; // 한 페이지 데이터 개수
  setTotalPages?: (totalPages: number) => void; // 총 페이지 수 설정 함수
};

export default function Card({
  folderId,
  links = [],
  searchQuery = '',
  currentPage = 1,
  pageSize = 9,
  setTotalPages = () => {},
}: CardProps) {
  const [link, setLink] = useState<LinkResponse[]>([]); // 전체 링크 데이터
  const [filteredLinks, setFilteredLinks] = useState<LinkResponse[]>([]); // 검색 결과
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const pathname = usePathname();
  const isLinks = pathname === '/links'; // 현재 페이지가 링크 페이지인지 확인

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true); // 로딩 시작
      try {
        let data;

        if (pathname === '/favorite') {
          // 즐겨찾기 페이지의 경우
          data = await getFavorites('11-4', currentPage, pageSize);
        } else if (pathname === '/links') {
          // 링크 페이지의 경우 폴더 ID에 따라 데이터 로드
          data = folderId
            ? await getLinksByFolderId(folderId, currentPage, pageSize)
            : await getLinks(currentPage, pageSize, searchQuery); // 검색어 추가
        } else {
          // 기본 링크 로드
          data = await getLinks(currentPage, pageSize, searchQuery); // 검색어 추가
        }

        if (data) {
          setLink(Array.isArray(data) ? data : data.list || []);
          setFilteredLinks(Array.isArray(data) ? data : data.list || []);
          const totalCount = Array.isArray(data) ? links.length : data.totalCount || 0;
          const calculatedTotalPages = Math.ceil(totalCount / pageSize);
          setTotalPages(calculatedTotalPages); // 총 페이지 수 설정
        }
      } catch (error) {
        console.error('링크를 불러오는데 실패했습니다.', error);
        setLink([]);
        setFilteredLinks([]);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadLinks();
  }, [folderId, pathname, currentPage, pageSize, setTotalPages, searchQuery]); // 검색어 및 페이지 변화에 따라 호출

  useEffect(() => {
    if (links.length > 0) {
      setLink((prev) => {
        const mergedLinks = [...links, ...prev];
        const uniqueLinks = Array.from(new Map(mergedLinks.map((item) => [item.id, item])).values());
        return uniqueLinks;
      });
    }
  }, [links]);

  // 검색어를 기준으로 필터링
  useEffect(() => {
    if (searchQuery) {
      const filtered = link.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks(link);
    }
  }, [searchQuery, link]);

  const handleFavoriteClick = async (linkId: number, currentFavorite: boolean) => {
    try {
      await putFavoriteLink(linkId, !currentFavorite);

      setLink((prevLinks) =>
        prevLinks.map((link) =>
          link.id === linkId ? { ...link, favorite: !currentFavorite } : link
        )
      );
    } catch (error) {
      console.error('즐겨찾기를 변경하는데 실패했습니다.', error);
    }
  };

  return (
    <div className="container max-w-[1060px] mx-auto px-0 flex justify-center items-center">
      {loading ? (
        // 로딩 상태 시 스켈레톤 표시
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-0 gap-x-[20px] gap-y-[25px] md:gap-x-[24px]">
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index} className="h-[200px] w-[340px] animate-pulse rounded bg-gray-300"></li>
          ))}
        </ul>
      ) : filteredLinks.length > 0 ? (
        // 필터링된 결과 렌더링
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-0 gap-x-[20px] gap-y-[25px] md:gap-x-[24px]"
          style={{ justifyItems: 'center' }}
        >
          {filteredLinks.map((link) => {
            const createdAt = new Date(link.createdAt);
            const relativeTime = formatUpdatedAt(createdAt);
            const absoluteDate = format(createdAt, 'yyyy.MM.dd');
            const startHttp = LinkData(link.url);

            return (
              <li
                key={link.id}
                className="w-[340px] h-[334px] relative overflow-hidden rounded-lg border bg-white shadow-lg"
              >
                <div className="relative block h-full w-full">
                  <Link
                    href={`${startHttp ? link.url : `https://${link.url}`}`}
                    target="_blank"
                    className="absolute inset-0 z-0"
                  />
                  <Image
                    src={link.imageSource || NoImage}
                    alt="링크 이미지"
                    width={340}
                    height={200}
                    className="object-cover w-[340px] h-[200px]"
                    unoptimized
                  />
                  {isLinks && (
                    <button
                      className="absolute top-4 right-4"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteClick(link.id, link.favorite);
                      }}
                    >
                      <Image
                        src={link.favorite ? starFill : starEmpty}
                        alt="즐겨찾기 버튼"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[13px] text-[#666666]">{relativeTime}</div>
                      {isLinks && (
                        <LinkKebab
                          linkId={link.id}
                          initialUrl={link.url}
                          onUpdate={(updatedLink) => {
                            setLink((prevLinks) =>
                              prevLinks.map((item) =>
                                item.id === updatedLink.id ? updatedLink : item
                              )
                            );
                          }}
                          onDelete={(deletedLinkId) => {
                            setLink((prevLinks) =>
                              prevLinks.filter((item) => item.id !== deletedLinkId)
                            );
                          }}
                        />
                        )}
                    </div>
                    <p className="text-[16px] text-[#000000] mt-2 text-base line-clamp-2">
                      {link.description}
                    </p>
                    <p className="text-[14px] text-[#333333]">{absoluteDate}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        // 결과가 없을 때 표시
        <p className="text-center text-gray-500">링크가 없습니다.</p>
      )}
    </div>
  );
}
