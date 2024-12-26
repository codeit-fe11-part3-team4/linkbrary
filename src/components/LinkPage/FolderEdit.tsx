'use client';

import { useState, useEffect } from 'react';
import Kakao from "../../../public/icons/kakao.svg";
import facebook from "../../../public/icons/ic_facebook.svg";
import link from "../../../public/icons/link.svg";
import Iconshare from "../../../public/icons/share.svg";
import Iconpen from "../../../public/icons/pen.svg";
//import Icondelete from "../../../public/icons/delete.svg";
import Image from 'next/image';
import { putFolder } from '@/api/api';

export default function FolderEdit({ folderId, folderName }: { folderId: number; folderName: string,  }) {
    const [showModal, setShowModal] = useState(false); // 공유 모달 상태
    const [showEditModal, setShowEditModal] = useState(false); // 이름 수정 모달 상태
    const [copied, setCopied] = useState(false); // 복사 상태 관리
    const [newFolderName, setNewFolderName] = useState(folderName); // 폴더 이름 관리
    const [isSaving, setIsSaving] = useState(false); // 저장 상태

      // folderName 변경 시 newFolderName 상태 업데이트
    useEffect(() => {
        setNewFolderName(folderName);
    }, [folderName]);
  
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; // 현재 URL
  
    const handleCopyClick = () => {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          setCopied(true); // 복사 성공 시 상태 업데이트
          setTimeout(() => setCopied(false), 2000); // 2초 후 복사 메시지 숨기기
        })
        .catch((err) => {
          console.error('링크 복사 실패:', err);
        });
    };
  
    const handleKakaoShare = () => {
      const kakaoShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?link=${encodeURIComponent(currentUrl)}`;
      window.open(kakaoShareUrl, '_blank');
    };
  
    const handleFacebookShare = () => {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(facebookShareUrl, '_blank');
    };

    const handleEditSubmit = async () => {
        setIsSaving(true);
        try {
          const updatedFolder = await putFolder(folderId, newFolderName); // API 호출
          console.log('폴더가 성공적으로 수정되었습니다:', updatedFolder);
          setShowEditModal(false); // 모달 닫기
        } catch (error) {
          console.error('폴더 이름 수정 실패:', error);
        } finally {
          setIsSaving(false);
        }
      };

    return (
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="text-[#9FA6B2] flex"
        >
          <Image src={Iconshare} alt="폴더 공유 아이콘" /> 공유
        </button>

        <button onClick={() => setShowEditModal(true)} className='text-[#9FA6B2] flex'>
            <Image src={Iconpen} alt='폴더 수정 아이콘'/> 이름 변경
        </button>

        {/* 공유 모달 */}
        {showModal && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={(event) => {
              event.stopPropagation(); // 모달 외부 클릭 이벤트 전파 방지
            }}
          >
            <div
              className="relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5 flex flex-col items-center"
              onClick={(event) => event.stopPropagation()} // 모달 내부 클릭 이벤트 전파 방지
            >
              <p className="mb-[16px]text-center text-[20px] font-[700]">폴더 공유</p>
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-[16px] top-[16px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
              >
                X
              </button>
              {/* 폴더 이름 표시 */}
              <p className="text-[#9FA6B2] mb-[22px] mt-[10px]">{folderName}</p>
  
              {/* 버튼 그룹 */}
              <div className="flex flex-row items-center justify-center gap-[32px]">
                <button onClick={handleKakaoShare} className="flex flex-col items-center text-[#373740]">
                  <Image src={Kakao} alt="카카오톡 공유 아이콘" className="mb-[10px]" /> 카카오톡
                </button>
                <button onClick={handleFacebookShare} className="flex flex-col items-center text-[#373740]">
                  <Image src={facebook} alt="페이스북 공유 아이콘" className="mb-[10px]" /> 페이스북
                </button>
                <button onClick={handleCopyClick} className="flex flex-col items-center text-[#373740]">
                  <Image src={link} alt="링크 복사 아이콘" className="mb-[10px]" /> 링크 복사
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 이름 수정 모달 */}
      {showEditModal && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            className="relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-4 text-center text-[20px] font-[700]">폴더 이름 수정</p>
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute right-[16px] top-[16px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
            >
              X
            </button>
            <input
              className="mb-4 w-full rounded border border-[#CCD5E3] p-2 placeholder-[#9FA6B2] focus:outline-none focus:ring-2 focus:ring-[#6D6AFE]"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="폴더 이름"
            />
            <button
              onClick={handleEditSubmit}
              disabled={isSaving}
              className="h-[40px] w-full rounded-[8px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff] disabled:opacity-50"
            >
              {isSaving ? '저장 중...' : '변경하기'}
            </button>
          </div>
        </div>
      )}
      
        {/* 복사 성공 알림 */}
        {copied && (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 rounded bg-white px-4 py-2 text-black shadow-md 
            transition-opacity duration-500 ease-in-out ${copied ? 'opacity-100' : 'opacity-0'}`}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500" // 아이콘 색상을 초록색으로 설정
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
            />
            </svg>
            <span>폴더가 복사되었습니다</span>
        </div>
        )}
      </div>
    );
  }