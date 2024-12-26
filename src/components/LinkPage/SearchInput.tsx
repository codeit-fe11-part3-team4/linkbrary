'use client';

import { useState } from 'react';
import IconSearch from '../../../public/icons/ic_search.svg';
import IconSearchGray from '../../../public/icons/ic_Search_gray.svg';
import Image from 'next/image';

type SearchInputProps = {
  onSearch: (query: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className='mt-[40px]'>
      <div className="flex items-center bg-[#F5F5F5] rounded-[10px] p-2 relative mb-[40px] pt-[15px] pb-[15px] pr-[16px] pl-[16px]">
        {/* 검색 아이콘 */}
        <Image
          src={searchQuery ? IconSearch : IconSearchGray}
          alt="검색아이콘"
          className="w-6 h-6 mr-2"
        />

        {/* 검색 입력 필드 */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="링크를 검색해 보세요."
          className="flex-grow bg-transparent outline-none placeholder:text-[#666666] text-black "
        />

        {/* X 버튼 */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-[#CCD5E3] text-white text-sm hover:opacity-80"
          >
            ✕
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="text-[32px] font-semibold mb-[40px]">
          <span className="text-black">{searchQuery}</span>
          <span className="text-[#9FA6B2]">으로 검색한 결과입니다.</span>
        </p>
      )}
    </div>
  );
}
