'use client';

import { useState } from 'react';
import IconSearch from '../../../public/icons/ic_search.svg';
import IconSearchGray from '../../../public/icons/ic_Search_gray.svg';
import Image from 'next/image';

type SearchInputProps = {
  onSearch: (query: string) => void; // 검색어 전달 콜백
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

  // 입력 필드 변화 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim(); // 공백 제거
    setSearchQuery(query); // 로컬 상태 업데이트
    onSearch(query); // 부모 컴포넌트로 검색어 전달
  };

  // 검색어 초기화 핸들러
  const handleClear = () => {
    setSearchQuery(''); // 검색어 상태 초기화
    onSearch(''); // 부모에 빈 문자열 전달
  };

  return (
    <div className="mt-[40px]">
      {/* 검색 입력창 컨테이너 */}
      <div className="flex items-center bg-[#F5F5F5] rounded-[10px] p-2 relative mb-[40px] pt-[15px] pb-[15px] pr-[16px] pl-[16px]">
        {/* 검색 아이콘 */}
        <Image
          src={searchQuery ? IconSearch : IconSearchGray} // 검색어 상태에 따라 아이콘 변경
          alt="검색아이콘"
          className="w-6 h-6 mr-2"
        />

        {/* 검색 입력 필드 */}
        <input
          type="text"
          value={searchQuery} // 검색어 상태 바인딩
          onChange={handleInputChange} // 입력 핸들러 연결
          placeholder="링크를 검색해 보세요."
          className="flex-grow bg-transparent outline-none placeholder:text-[#666666] text-black"
        />

        {/* X 버튼 (검색어 초기화) */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-[#CCD5E3] text-white text-sm hover:opacity-80"
          >
            ✕
          </button>
        )}
      </div>

      {/* 검색 상태에 따른 메시지 */}
      {searchQuery && (
        <p className="text-[32px] font-semibold mb-[40px]">
          <span className="text-black">{searchQuery}</span>
          <span className="text-[#9FA6B2]">으로 검색한 결과입니다.</span>
        </p>
      )}
    </div>
  );
}
