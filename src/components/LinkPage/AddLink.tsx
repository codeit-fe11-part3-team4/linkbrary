'use client';

import { useState } from 'react';
import { getFolders, postLink } from '@/api/api';
import { LinkResponse, FolderResponse } from '@/types/api';
import LinkIcon from '../../../public/icons/ic_link.svg';
import Image from 'next/image';

type AddLinkInputProps = {
  onLinkAdded: (newLink: LinkResponse) => void; // 새 링크 추가 콜백
};

export default function AddLinkInput({ onLinkAdded }: AddLinkInputProps) {
  const [link, setLink] = useState<string>(''); // 입력된 링크 상태
  const [folders, setFolders] = useState<FolderResponse[]>([]); // 폴더 목록 초기값은 빈 배열
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 선택된 폴더 ID
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false); // 폴더 선택 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data || []); // 데이터가 없을 경우 빈 배열로 설정
    } catch (error) {
      console.error('폴더 목록을 가져오는데 실패했습니다.', error);
      setFolders([]); // 에러 발생 시 빈 배열로 초기화
    }
  };

  // 추가하기 버튼 클릭하면 폴더 목록 모달 보이게 하기
  const handleOpenFolderModal = async () => {
    await fetchFolders();
    setShowFolderModal(true);
  };

  // 링크 추가 핸들러
  const handleAddLink = async () => {
    if (!link.trim()) {
      alert('링크를 입력해 주세요.');
      return;
    }
    if (!selectedFolderId) {
      alert('폴더를 선택해 주세요.');
      return;
    }

    try {
      setLoading(true);
      const newLink = await postLink(selectedFolderId, link);
      alert('링크가 추가되었습니다!');
      setLink(''); // 입력창 초기화
      setShowFolderModal(false); // 모달 닫기
      setSelectedFolderId(null); // 선택된 폴더 초기화
      onLinkAdded(newLink); // 부모 컴포넌트로 새 링크 전달
    } catch (error) {
      console.error('링크 추가 실패', error);
      alert('링크 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="1px mb-[30px] flex h-[69px] w-[50vw] items-center justify-center rounded-[15px] border border-[#6D6AFE] bg-[#ffffff] pb-[20px] pl-[16px] pr-[16px] pt-[20px]">
        <Image src={LinkIcon} alt="LinkIcon" className="h-[20px] w-[20px]" />
        <input
          placeholder="링크를 추가해 보세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="h-[37px] w-[100%] flex-grow rounded border border-none border-gray-300 px-4"
          disabled={loading}
        />
        <button
          onClick={handleOpenFolderModal}
          disabled={loading}
          className="h-[37px] w-[80px] rounded bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[14px] text-[#f5f5f5]"
        >
          추가하기
        </button>
      </div>

      {/* 폴더 선택 모달 */}
      {showFolderModal && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="z-60 relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5">
            <div>
              <div className="relative mb-[30px] mt-[10px] flex items-center justify-center">
                <button
                  onClick={() => setShowFolderModal(false)}
                  className="absolute right-0 mb-[20px] ml-[20px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
                >
                  X
                </button>
                <p className="text-[20px] font-extrabold">폴더에 추가</p>
              </div>

              {/* 폴더 목록 */}
              {folders.length > 0 ? ( // 폴더가 있는 경우
                <ul className="mb-4 max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {folders.map((folder) => (
                    <li
                      key={folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      className={`cursor-pointer p-2 ${
                        selectedFolderId === folder.id ? 'bg-[#F0F6FF]' : ''
                      }`}
                    >
                      {folder.name}
                    </li>
                  ))}
                </ul>
              ) : (
                // 폴더가 없는 경우
                <p className="text-center text-gray-500">폴더가 없습니다.</p>
              )}

              {/* 추가하기 버튼 */}
              <button
                onClick={handleAddLink}
                disabled={!selectedFolderId || loading}
                className="h-[40px] w-full rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff]"
              >
                {loading ? '추가 중...' : '추가하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
