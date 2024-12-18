"use client";

import { postFolder } from "@/api/api"
import { useState } from "react"

type AddFolderProps = {
    onFolderAdd: () => void;
};

export default function AddFolder({ onFolderAdd }: AddFolderProps){
    const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
    const [folderName, setFolderName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddFolderName = async () => {
        if (!folderName.trim()){
            alert("폴더 이름을 입력하세요.");
            return;
        }

        setLoading(true);

        try {
            const newFolder = await postFolder(folderName);
            alert(`${newFolder.name}이(가) 생성되었습니다!`);
            setFolderName("");
            setShowFolderModal(false);

            onFolderAdd();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("폴더 생성 실패");
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <div>
                <button className="text-[#6D6AFE]  bg-[#ffffff] whitespace-nowrap" onClick={()=>setShowFolderModal(true)}>폴더 추가 +</button>
            </div>

            {/* 모달 */}
            {showFolderModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-[80vw] max-w-[360px] relative">
    
                        <p className="text-[20px] font-[700] text-center mb-4">폴더 추가</p>

                        <button
                            onClick={() => setShowFolderModal(false)}
                            className="absolute top-[16px] right-[16px] w-[24px] h-[24px] bg-[#E7EFFB] text-[#9FA6B2] rounded-full flex items-center justify-center"
                        >
                            X
                        </button>

                        <input
                            className="border border-[#CCD5E3] placeholder-[#9FA6B2] w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#6D6AFE]"
                            placeholder="내용 입력"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />

                        <button
                            className="w-full h-[40px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] text-[#ffffff] rounded-[8px]"
                            onClick={handleAddFolderName}
                            disabled={loading}
                        >
                            {loading ? "추가중..." : "추가하기"}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}