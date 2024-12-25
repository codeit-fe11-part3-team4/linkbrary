'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import kebab from '../../../public/icons/ic_kebab.svg';

export default function LinkKebab() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
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

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="p-2">
        <Image src={kebab} alt="Kebab Menu" width={16} height={16} />
      </button>
      {isOpen && (
        <div
          className="absolute right-2 top-6 bg-white rounded-md"
          style={{
            width: '100px',
            boxShadow: '0px 4px 6px rgba(51, 50, 54, 0.1)',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <ul className="text-center">
            <li className="px-[7px] py-[10px] text-[14px] cursor-pointer hover:bg-[#E7EFFB] hover:text-[#6D6AFE]">
              수정하기
            </li>
            <li className="px-[7px] py-[10px] text-[14px] cursor-pointer hover:bg-[#E7EFFB] hover:text-[#6D6AFE]">
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
  
  
}
