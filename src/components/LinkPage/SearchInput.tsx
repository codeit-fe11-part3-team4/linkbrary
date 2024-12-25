'use client';

import { useState } from 'react';

type SearchInputProps = {
  onSearch: (query: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // 검색어 상태 변경 시 부모 컴포넌트로 전달
  };

  const handleClear = () => {
    setSearchQuery(''); // 검색어를 빈 값으로 초기화
    onSearch(''); // 부모 컴포넌트로도 빈 값 전달
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요..."
        className="w-full px-4 py-2 border rounded"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      )}
      {searchQuery && <p>{searchQuery}으로 검색한 결과입니다.</p>}
    </div>
  );
}