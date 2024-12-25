'use client';

import Card from '@/components/Card';
import { useAuth } from '@/utils/AuthContext';

export default function Favorite() {
  const { accessToken } = useAuth();

  return (
    <div>
      <div className="w-full bg-[#F0F6FF] pb-[60px]">
        <h1 className="text-center text-[40px] font-semibold">⭐️ 즐겨찾기</h1>
      </div>
      <div className='mt-[20px] mb-[32px] xs:mt-[40px] xs:mb-[40px]'>
        {accessToken ? (
          <div><Card folderId={null} /></div>
        ) : (
          <div className="mt-8 text-center text-lg font-medium">
            로그인이 필요합니다. 로그인 후 즐겨찾기를 확인해주세요.
          </div>
        )}
      </div>
    </div>
  );
}
