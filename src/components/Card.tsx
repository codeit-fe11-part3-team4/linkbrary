'use client';

import { getLinks, getFavorites, putFavoriteLink } from '@/api/api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NoImage from '../../public/images/NoImage.svg';
import starEmpty from '../../public/icons/ic_star_empty.svg';
import starFill from '../../public/icons/ic_star_fill.svg';
import { usePathname } from 'next/navigation';
import { LinkResponse } from '@/types/api';
import { formatUpdatedAt } from '@/utils/date';
import { format } from 'date-fns';

export default function Card() {
  const [link, setLink] = useState<LinkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        const teamId = '11-4';
        const data =
          pathname === '/favorite' ? await getFavorites(teamId, 1, 9) : await getLinks(1, 9, '');
        setLink(data.list || []);
      } catch (error) {
        console.error('링크를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, [pathname]);

  const handleFavoriteClick = async (linkId: number, currentFavorite: boolean) => {
    try {
      await putFavoriteLink(linkId, !currentFavorite);

      setLink((prevLinks) =>
        prevLinks.map((link) =>
          link.id === linkId ? { ...link, favorite: !currentFavorite } : link,
        ),
      );
    } catch (error) {
      console.error('즐겨찾기를 변경하는데 실패했습니다.', error);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ul>
            {link.map((link) => {
              const createdAt = new Date(link.createdAt);
              const relativeTime = formatUpdatedAt(createdAt);
              const absoluteDate = format(createdAt, 'yyyy.MM.dd');

              return (
                <li key={link.id} className="relative">
                  <Image
                    src={link.imageSource || NoImage}
                    alt="링크 이미지"
                    width={340}
                    height={200}
                    className="h-[200px] w-[340px] object-cover"
                    unoptimized
                  />
                  {/* /links일 때때 즐겨찾기 버튼 표시 */}
                  {pathname !== '/favorite' && (
                    <button
                      className="absolute right-2 top-2"
                      onClick={() => handleFavoriteClick(link.id, link.favorite)}
                    >
                      <Image
                        src={link.favorite ? starFill : starEmpty}
                        alt="즐겨찾기 버튼"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                  <div>{relativeTime}</div>
                  <p>{link.description}</p>
                  <p>{absoluteDate}</p>
                  <br />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
