'use client';

import { getFolders } from '@/api/api';
import { FolderResponse } from '@/types/api';
import { useEffect, useState } from 'react';

export default function FoldersList() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadFolders = async () => {
      setLoading(true);
      try {
        const data = await getFolders();
        setFolders(data || []);
      } catch (error) {
        console.error('폴더를 불러오는데 실패했습니다. ', error);
      } finally {
        setLoading(false);
      }
    };
    loadFolders();
  }, []);

  //if loading return
  return (
    <div>
      {loading ? ( //빼도 됨
        // 스켈레톤 로딩 UI
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-[40px] w-[80px] animate-pulse rounded bg-gray-300"></div>
          ))}
        </div>
      ) : (
        // 폴더 리스트
        <div className="flex flex-wrap gap-2">
          <p className="rounded-[5px] border border-[#6D6AFE] pb-[8px] pl-[12px] pr-[12px] pt-[8px] text-[16px]">
            전체
          </p>
          {folders.map((folder) => (
            <p
              className="rounded-[5px] border border-[#6D6AFE] pb-[8px] pl-[12px] pr-[12px] pt-[8px] text-[16px]"
              key={folder.id}
            >
              {folder.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
