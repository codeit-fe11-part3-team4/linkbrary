'use client';

import { getLinks, getFavorites } from '@/api/api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NoImage from '../../public/images/NoImage.svg';
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
        const teamId = '11-4'; // teamId 설정
        const data =
          pathname === '/favorite'
            ? await getFavorites(teamId, 1, 9) // teamId를 전달
            : await getLinks(1, 9, '');
        setLink(data.list || []);
      } catch (error) {
        console.error('링크를 불러오는데 실패했습니다다.', error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, [pathname]);

  return (
    <>
      <div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ul>
            {link.map((link) => {
              const createdAt = new Date(link.createdAt);
              const relativeTime = formatUpdatedAt(createdAt); // 상대적 시간
              const absoluteDate = format(createdAt, 'yyyy.MM.dd'); // 절대적 시간

              return (
                <li key={link.id}>
                  <Image
                    src={link.imageSource || NoImage}
                    alt="링크 이미지"
                    width={340}
                    height={200}
                    className="h-[200px] w-[340px] object-cover"
                    unoptimized
                  />
                  <div>{relativeTime}</div>
                  <p>{link.description}</p>
                  {/* 이미지 아래 절대적 시간 표시 */}
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
