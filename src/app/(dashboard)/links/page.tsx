'use client';

import { useState } from 'react';
import AddLinkInput from '@/components/LinkPage/AddLink';
import FoldersList from '@/components/LinkPage/FoldersList';
import AddFolder from '@/components/LinkPage/AddFolder';
import Card from '@/components/Card';
import { LinkResponse } from '@/types/api';
import SearchInput from '@/components/LinkPage/SearchInput';

const LinksPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 폴더 ID 관리
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkResponse[]>([]); // 링크 데이터 관리
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리

  const refreshFolders = () => {
    setUpdateFlag((prev) => !prev);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 새로운 링크를 추가하고 스켈레톤 표시
  const handleAddNewLink = (newLink: LinkResponse) => {
    setLinks((prevLinks) => [newLink, ...prevLinks]); // 새로운 링크 추가
  };

  return (
    <div>
      <div className="flex h-[200px] w-full items-center justify-center bg-[#F0F6FF]">
        <AddLinkInput onLinkAdded={handleAddNewLink} />
      </div>
      <div className="flex justify-center">
        <div className="w-[325px] md:w-[704px] lg:w-[1060px]">
        <SearchInput onSearch={handleSearch}/>
          <div className="flex mt-[32px] xs:mt-[40px]">
            <FoldersList key={updateFlag.toString()} onSelectFolder={setSelectedFolderId} />
            <AddFolder onFolderSkeleton={refreshFolders} />
          </div>
        </div>
      </div>
      <div className='mb-[32px] xs:mb-[40px]'>
        <Card folderId={selectedFolderId} links={links} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default LinksPage;
