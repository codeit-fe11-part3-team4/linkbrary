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

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요..."
      />
    </div>
  );
}
