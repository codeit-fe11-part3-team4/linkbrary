'use client';

import { postFolder } from '@/api/api';
import { useState } from 'react';

type AddFolderProps = {
  onFolderSkeleton: () => void; //이름변경경
};

export default function AddFolder({ onFolderSkeleton }: AddFolderProps) {
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddFolderName = async () => {
    if (!folderName.trim()) {
      alert('폴더 이름을 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const newFolder = await postFolder(folderName);
      alert(`${newFolder.name}이(가) 생성되었습니다!`);
      setFolderName('');
      setShowFolderModal(false);

      onFolderSkeleton();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('폴더 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className="whitespace-nowrap text-[16px] text-[#FFFFFF] bg-[#6D6AFE] mt-[8px] md:static fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[127px] py-2 px-4 rounded-[20px] z-[1000] md:w-auto md:bg-transparent md:text-[#6D6AFE] md:py-0 md:px-0 md:rounded-none"
          onClick={() => setShowFolderModal(true)}
        >
          폴더 추가 +
        </button>
      </div>

      {/* 모달 */}
      {showFolderModal && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
          <div className="z-60 relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5">
            <p className="mb-4 text-center text-[20px] font-[700]">폴더 추가</p>

            <button
              onClick={() => setShowFolderModal(false)}
              className="absolute right-[16px] top-[16px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
            >
              X
            </button>

            <input
              className="mb-4 w-full rounded border border-[#CCD5E3] p-2 placeholder-[#9FA6B2] focus:outline-none focus:ring-2 focus:ring-[#6D6AFE]"
              placeholder="내용 입력"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />

            <button
              className="h-[40px] w-full rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff]"
              onClick={handleAddFolderName}
              disabled={loading}
            >
              {loading ? '추가중...' : '추가하기'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
