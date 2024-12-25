'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import kebab from '../../../public/icons/ic_kebab.svg';

export default function LinkKebab() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 차단
    event.preventDefault(); // 기본 링크 이동 동작 방지
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  // Click outside to close
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

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="p-2">
        <Image src={kebab} alt="Kebab Menu" width={16} height={16} />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-8 bg-white border rounded shadow-md"
          style={{ width: '100px' }} // 드롭다운 가로 크기 설정
          onClick={(event) => event.stopPropagation()} // 드롭다운 내부 클릭 시 이벤트 전파 차단
        >
          <ul className="py-1 text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">수정하기</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">삭제하기</li>
          </ul>
        </div>
      )}
    </div>
  );
}
