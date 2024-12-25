'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import kebab from '../../../public/icons/ic_kebab.svg';
import { putLink } from '@/api/api';
import { LinkResponse } from '@/types/api';

interface LinkKebabProps {
    linkId: number;
    initialUrl: string;
    onUpdate: (updatedLink: LinkResponse) => void;
  }

export default function LinkKebab({ linkId, initialUrl, onUpdate }: LinkKebabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [url, setUrl] = useState(initialUrl);
  const [isSaving, setIsSaving] = useState(false);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 방지
    event.preventDefault(); // 기본 동작 방지
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditSubmit = async () => {
    setIsSaving(true);
    try {
      // 수정할 데이터를 url 필드에 포함
      const updatedLink = await putLink(linkId, {
        url, // url 필드로 전송
      });
      onUpdate(updatedLink); // 부모 컴포넌트에 업데이트 알림
      setShowEditModal(false);
    } catch (error) {
      console.error('링크 수정에 실패했습니다.', error);
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div
      className="relative"
      onClick={(event) => event.stopPropagation()} // 부모 클릭 방지
    >
      <button onClick={toggleMenu} className="p-2">
        <Image src={kebab} alt="Kebab Menu" width={16} height={16} />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div
          className="absolute right-2 top-6 bg-white rounded-md"
          style={{
            width: '100px',
            boxShadow: '0px 4px 6px rgba(51, 50, 54, 0.1)',
          }}
          onClick={(event) => {
            event.stopPropagation(); // 드롭다운 클릭 이벤트 전파 방지
            event.preventDefault(); // 기본 동작 방지
          }}
        >
          <ul className="text-center">
            <li
              className="px-[7px] py-[10px] text-[14px] cursor-pointer hover:bg-[#E7EFFB] hover:text-[#6D6AFE]"
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 방지
                setShowEditModal(true);
                closeMenu();
              }}
            >
              수정하기
            </li>
            <li
              className="px-[7px] py-[10px] text-[14px] cursor-pointer hover:bg-[#E7EFFB] hover:text-[#6D6AFE]"
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 방지
                setShowDeleteModal(true);
                closeMenu();
              }}
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}

      {/* 수정하기 모달 */}
      {showEditModal && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={(event) => {
            event.stopPropagation(); // 모달 외부 클릭 이벤트 전파 방지
          }}
        >
          <div
            className="relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5"
            onClick={(event) => event.stopPropagation()} // 모달 내부 클릭 이벤트 전파 방지
          >
            <p className="mb-4 text-center text-[20px] font-[700]">링크 주소 수정</p>
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute right-[16px] top-[16px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
            >
              X
            </button>
            <input
              className="mb-4 w-full rounded border border-[#CCD5E3] p-2 placeholder-[#9FA6B2] focus:outline-none focus:ring-2 focus:ring-[#6D6AFE]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="링크 주소"
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

      {/* 삭제하기 모달 */}
      {showDeleteModal && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={(event) => {
            event.stopPropagation(); // 모달 외부 클릭 이벤트 전파 방지
          }}
        >
          <div
            className="relative w-[80vw] max-w-[360px] rounded-lg bg-white p-5"
            onClick={(event) => event.stopPropagation()} // 모달 내부 클릭 이벤트 전파 방지
          >
            <p className="mb-4 text-center text-[20px] font-[700]">링크 삭제</p>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-[16px] top-[16px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E7EFFB] text-[#9FA6B2]"
            >
              X
            </button>
            <p className="mb-4 text-center text-[#9FA6B2]">링크 주소</p>
            <button className="mb-2 h-[40px] w-full rounded-[8px] bg-[#FF5B56] text-[#F5F5F5]">
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
