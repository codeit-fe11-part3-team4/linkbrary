"use client";

import { useState, useEffect, ReactNode } from "react";
import { getLinks } from "@/api/api";
import AddLinkInput from "@/components/LinkPage/AddLink";


interface LinkResponse {
  [x: string]: ReactNode;
  id: number;
  title: string;
  imageSource: string;
}

const LinksPage = () => {
  const [links, setLinks] = useState<LinkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await getLinks(1, 9, "");
        setLinks(data.list || []);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  return (
    <div>
      <div className="w-full h-[200px] bg-[#F0F6FF] flex justify-center items-center">
        <AddLinkInput/>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={link.id} >
              <h2>{link.description}</h2>
              <br/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LinksPage;
