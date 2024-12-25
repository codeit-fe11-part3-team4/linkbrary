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
};

export default function Card({ folderId, links = [], searchQuery = '' }: CardProps) {
  const [link, setLink] = useState<LinkResponse[]>([]); // 초기값 빈 배열
  const [filteredLinks, setFilteredLinks] = useState<LinkResponse[]>([]); // 검색된 링크 상태
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        let data;

        if (pathname === '/favorite') {
          data = await getFavorites('11-4', 1, 9);
        } else if (pathname === '/links') {
          data = folderId ? await getLinksByFolderId(folderId, 1, 9) : await getLinks(1, 9, '');
        }

        if (data) {
          setLink(Array.isArray(data) ? data : data.list || []);
          setFilteredLinks(Array.isArray(data) ? data : data.list || []); // 초기 필터링 상태 설정
        }
      } catch (error) {
        console.error('링크를 불러오는데 실패했습니다.', error);
        setLink([]);
        setFilteredLinks([]);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, [folderId, pathname]);

  // 부모 컴포넌트에서 전달된 링크 병합
  useEffect(() => {
    if (links.length > 0) {
      setLink((prev) => {
        const mergedLinks = [...links, ...prev];
        const uniqueLinks = Array.from(new Map(mergedLinks.map((item) => [item.id, item])).values());
        return uniqueLinks;
      });
    }
  }, [links]);

  // 검색어로 필터링
  useEffect(() => {
    const filtered = link.filter((item) =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLinks(filtered);
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
        // 로딩 중일 때 스켈레톤
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-0 gap-x-[20px] gap-y-[25px] md:gap-x-[24px]">
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index} className="h-[200px] w-[340px] animate-pulse rounded bg-gray-300"></li>
          ))}
        </ul>
      ) : filteredLinks.length > 0 ? (
        // 데이터 로드 후 렌더링
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
                {/* Link 외부에 클릭 차단 처리 */}
                <div
                  className="relative block h-full w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link
                    href={`${startHttp ? link.url : `https://${link.url}`}`}
                    target="_blank"
                    className="absolute inset-0 z-0"
                    onClick={(e) => {
                      if (
                        e.target instanceof HTMLElement &&
                        e.target.closest('.prevent-link')
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Image
                    src={link.imageSource || NoImage}
                    alt="링크 이미지"
                    width={340}
                    height={200}
                    className="object-cover w-[340px] h-[200px]"
                    unoptimized
                  />
                  {pathname !== '/favorite' && (
                    <button
                      className="absolute top-4 right-4 prevent-link"
                      onClick={(e) => {
                        e.stopPropagation();
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
                    <div
                      className="flex justify-between items-center prevent-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* 상대적 시간 */}
                      <div className="text-[13px] text-[#666666]">{relativeTime}</div>
                      {/* Kebab 메뉴 */}
                      <div className="prevent-link">
                      <LinkKebab
                        linkId={link.id}
                        initialUrl={link.url}
                        onUpdate={(updatedLink) => {
                          setLink((prevLinks) =>
                            prevLinks.map((item) => (item.id === updatedLink.id ? updatedLink : item))
                          );
                        }}
                      />
                      </div>
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
        <p className="text-center text-gray-500">링크가 없습니다.</p>
      )}
    </div>
  );
}
