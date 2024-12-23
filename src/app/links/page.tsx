'use client';

import { useState, useEffect, ReactNode } from 'react';
import { getLinks } from '@/api/api';
import AddLinkInput from '@/components/LinkPage/AddLink';
import FoldersList from '@/components/LinkPage/FoldersList';
import AddFolder from '@/components/LinkPage/AddFolder';

interface LinkResponse {
  [x: string]: ReactNode;
  id: number;
  title: string;
  imageSource: string;
}

const LinksPage = () => {
  const [links, setLinks] = useState<LinkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await getLinks(1, 9, '');
        setLinks(data.list || []);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

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
            <FoldersList key={updateFlag.toString()} />
            <AddFolder onFolderSkeleton={refreshFolders} />
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <h2>{link.description}</h2>
                  <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
