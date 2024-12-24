/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { getFolders, postLink } from "@/api/api";
import { LinkResponse, FolderResponse } from "@/types/api";
import LinkIcon from "../../../public/icons/ic_link.svg";
import Image from "next/image";

export default function AddLinkInput() {
  const [link, setLink] = useState<string>(""); // 입력된 링크 상태
  const [folders, setFolders] = useState<FolderResponse[]>([]); // 폴더 목록
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 선택된 폴더 ID
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false); // 폴더 선택 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error(error);
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
      alert("링크를 입력해 주세요.");
      return;
    }
    if (!selectedFolderId) {
      alert("폴더를 선택해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const LinkResponse = await postLink(selectedFolderId, link);
      alert("링크가 추가되었습니다!");
      setLink(""); // 입력창 초기화
      setShowFolderModal(false); // 모달 닫기
      setSelectedFolderId(null); // 선택된 폴더 초기화
    } catch (error) {
      alert("링크 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[50vw] h-[69px] bg-[#ffffff] flex items-center justify-center pr-[16px] pl-[16px] pt-[20px] pb-[20px] rounded-[15px] border 1px border-[#6D6AFE] mb-[30px]">
        <Image src={LinkIcon} alt="LinkIcon" className="w-[20px] h-[20px]" />
        <input
          placeholder="링크를 추가해 보세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border-none flex-grow w-[100%] h-[37px] px-4 border border-gray-300 rounded"
          disabled={loading}
        />
        <button
          onClick={handleOpenFolderModal}
          disabled={loading}
          className="w-[80px] h-[37px] text-[14px] text-[#f5f5f5] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] rounded"
        >
          추가하기
        </button>
      </div>

      {/* 폴더 선택 모달 */}
      {showFolderModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[80vw] max-w-[360px]">
            <div>
              <div className="flex items-center justify-center relative mb-[30px] mt-[10px]">
                <button
                  onClick={() => setShowFolderModal(false)}
                  className="absolute right-0 mb-[20px] ml-[20px] w-[24px] h-[24px] bg-[#E7EFFB] text-[#9FA6B2] rounded-full flex items-center justify-center"
                >
                  X
                </button>
                <p className="text-[20px] font-extrabold">폴더에 추가</p>
              </div>

              {/* 폴더 목록 */}
              <ul className="mb-4 max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {folders.map((folder) => (
                  <li
                    key={folder.id}
                    onClick={() => setSelectedFolderId(Number(folder.id))}
                    className={`p-2 cursor-pointer ${
                      selectedFolderId === Number(folder.id) ? "bg-[#F0F6FF]" : ""
                    }`}
                  >
                    {folder.name}
                  </li>
                ))}
              </ul>

              {/* 추가하기 버튼 */}
              <button
                onClick={handleAddLink}
                disabled={!selectedFolderId || loading}
                className="w-full h-[40px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff] rounded-[8px]"
              >
                {loading ? "추가 중..." : "추가하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
