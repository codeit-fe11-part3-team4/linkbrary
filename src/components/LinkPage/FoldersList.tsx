'use client';

import { getFolders } from '@/api/api';
import { FolderResponse } from '@/types/api';
import { useEffect, useState } from 'react';

type FoldersListProps = {
  onSelectFolder: (folderId: number | null) => void; // 폴더 선택 이벤트
};

export default function FoldersList({ onSelectFolder }: FoldersListProps) {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 선택된 폴더 ID
  const [selectedFolderName, setSelectedFolderName] = useState<string>('전체');

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

  const handleFolderSelect = (folderId: number | null, folderName: string) => {
    setSelectedFolderId(folderId); // 선택된 폴더 ID
    setSelectedFolderName(folderName);
    onSelectFolder(folderId); // 선택된 폴더 ID 전달
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-[40px] w-[80px] animate-pulse rounded bg-gray-300"></div>
          ))}
        </div>
      ) : (
        <div>
          {/* 폴더 리스트 */}
          <div className="flex flex-wrap gap-2">
            <p
              className={`cursor-pointer rounded-[5px] border border-[#6D6AFE] pb-[8px] pl-[12px] pr-[12px] pt-[8px] text-[16px] ${
                selectedFolderId === null ? 'bg-[#6D6AFE] text-[#FFFFFF]' : ''
              }`}
              onClick={() => handleFolderSelect(null, '전체')}
            >
              전체
            </p >
            {folders.map((folder) => (
              <p
                key={folder.id}
                className={`cursor-pointer rounded-[5px] border border-[#6D6AFE] pb-[8px] pl-[12px] pr-[12px] pt-[8px] text-[16px] ${
                  selectedFolderId === folder.id ? 'bg-[#6D6AFE] text-[#FFFFFF]' : ''
                }`}
                onClick={() => handleFolderSelect(folder.id, folder.name)}
              >
                {folder.name}
              </p>
            ))}
          </div>
        </div>
      )}
      <h1 className='text-[24px] font-bold mt-[28px] mb-[12px] md:mt-[24px] md:mb-[24px]'>{selectedFolderName}</h1>
    </div>
  );
}
