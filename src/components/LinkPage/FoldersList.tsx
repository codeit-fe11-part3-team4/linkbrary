'use client';

import { getFolders } from '@/api/api';
import { FolderResponse } from '@/types/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FolderEdit from './FolderEdit';

type FoldersListProps = {
  onSelectFolder: (folderId: number | null) => void;
};

export default function FoldersList({ onSelectFolder }: FoldersListProps) {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('전체');
  const router = useRouter();

  useEffect(() => {
    const loadFolders = async () => {
      setLoading(true);
      try {
        const data = await getFolders();
        setFolders(data || []);
      } catch (error) {
        console.error('폴더를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    loadFolders();
  }, []);

  const handleFolderSelect = (folderId: number | null, folderName: string) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    onSelectFolder(folderId);

    // 쿼리 업데이트
    router.push(`/links${folderId ? `?folder=${folderId}` : ''}`);
  };

  const handleFolderUpdate = (folderId: number, newName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );

    if (selectedFolderId === folderId) {
      setSelectedFolderName(newName);
    }
  };

  const handleFolderDelete = (folderId: number) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));

    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
      setSelectedFolderName('전체');
      router.push('/links');
    }
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
            </p>
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
    <div className="relative flex items-center justify-between mt-[28px] mb-[12px] md:mt-[24px] md:mb-[24px]">
  <h1 className="text-[24px] font-bold">{selectedFolderName}</h1>
  {selectedFolderId !== null && (
    <div className="relative" style={{ position: 'relative', left: '80px' }}>
      <FolderEdit
        folderId={selectedFolderId}
        folderName={selectedFolderName}
        onFolderUpdate={handleFolderUpdate}
        onFolderDelete={handleFolderDelete}
      />
    </div>
  )}
</div>
    </div>
  );
}
