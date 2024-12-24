'use client';

import { useState } from 'react';
import AddLinkInput from '@/components/LinkPage/AddLink';
import FoldersList from '@/components/LinkPage/FoldersList';
import AddFolder from '@/components/LinkPage/AddFolder';
import Card from '@/components/Card';

const LinksPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 폴더 ID 관리
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  //스켈레톤
  const refreshFolders = () => {
    setUpdateFlag((prev) => !prev);
  };

  return (
    <div>
      <div className="flex h-[200px] w-full items-center justify-center bg-[#F0F6FF]">
        <AddLinkInput />
      </div>
      <div className="flex justify-center">
        <div className="w-[70vw]">
          <div className="flex">
            <FoldersList key={updateFlag.toString()} onSelectFolder={setSelectedFolderId} />
            <AddFolder onFolderSkeleton={refreshFolders} />
          </div>
        </div>
      </div>
      <Card folderId={selectedFolderId} />
    </div>
  );
};

export default LinksPage;
