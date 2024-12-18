"use client";

import { getFolders } from "@/api/api"
import { FolderResponse } from "@/types/api"
import { useEffect, useState } from "react"

export default function FoldersList(){
    const [folders, setFolders] = useState<FolderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        const loadFolders = async () => {
            setLoading(true);
            try{
                const data = await getFolders();
                setFolders(data || []);
            }catch(error){
                console.error("폴더를 불러오는데 실패했습니다. ", error);
            }finally {
                setLoading(false);
            }
        };
        loadFolders();
    }, []);


    return(
        <div>
            
            {(()=>{
                if (loading) {
                    return <p>Loading...</p>;
                }
                if(folders.length > 0) {
                    return (
                        <div className="flex flex-wrap">
                            <p className="pt-[8px] pb-[8px] pr-[12px] pl-[12px] border border-[#6D6AFE] text-[16px] mr-[8px] rounded-[5px] mt-[12px]">전체</p>
                            {folders.map((folder) => (
                                <p className="pt-[8px] pb-[8px] pr-[12px] pl-[12px] border border-[#6D6AFE] text-[16px] mr-[8px] rounded-[5px] mt-[12px]" key={folder.id} >{folder.name}</p>
                            ))}
                        </div>
                    );
                }
                return <p> </p>;
            })()}
        </div>
    );
}