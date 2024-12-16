"use client";

import { useState } from "react";
import { getFolders, postLink } from "@/api/api";
import { LinkResponse, FolderResponse } from "@/types/api";

export default function AddLinkInput() {
  const [link, setLink] = useState<string>(""); // 입력된 링크 상태
  const [folders, setFolders] = useState<FolderResponse[]>([]); // 폴더 목록
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 선택된 폴더 ID
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false); // 폴더 선택 모달 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("폴더 목록 가져오기 실패:", error);
    }
  };

  // 추가하기 버튼 클릭 시 폴더 선택 팝업 열기
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
      const response: LinkResponse = await postLink(selectedFolderId, link);
      console.log("링크 추가 성공:", response);
      alert("링크가 성공적으로 추가되었습니다!");
      setLink(""); // 입력창 초기화
      setShowFolderModal(false); // 모달 닫기
      setSelectedFolderId(null); // 선택된 폴더 초기화
    } catch (error) {
      console.error("링크 추가 실패:", error);
      alert("링크 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>링크 추가</h1>
      <input
        placeholder="링크를 추가해 보세요."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ marginRight: "8px", padding: "4px", width: "250px" }}
        disabled={loading}
      />
      <button onClick={handleOpenFolderModal} disabled={loading}>
        추가하기
      </button>

      {/* 폴더 선택 모달 */}
      {showFolderModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h2>폴더 선택</h2>
            <ul>
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  onClick={() => setSelectedFolderId(Number(folder.id))}
                >
                  {folder.name}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button onClick={handleAddLink} disabled={!selectedFolderId || loading}>
                {loading ? "추가 중..." : "추가하기"}
              </button>
              <button onClick={() => setShowFolderModal(false)} style={{ marginLeft: "8px" }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
