'use client';

import { useState } from 'react';
import AddLinkInput from '@/components/LinkPage/AddLink';
import FoldersList from '@/components/LinkPage/FoldersList';
import AddFolder from '@/components/LinkPage/AddFolder';
import Card from '@/components/Card';
import { LinkResponse } from '@/types/api';

const LinksPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 폴더 ID 관리
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkResponse[]>([]); // 링크 데이터 관리

  const refreshFolders = () => {
    setUpdateFlag((prev) => !prev);
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
        <div className="w-[70vw]">
          <div className="flex">
            <FoldersList key={updateFlag.toString()} onSelectFolder={setSelectedFolderId} />
            <AddFolder onFolderSkeleton={refreshFolders} />
          </div>
        </div>
      </div>
      <Card folderId={selectedFolderId} links={links} />
    </div>
  );
};

export default LinksPage;
