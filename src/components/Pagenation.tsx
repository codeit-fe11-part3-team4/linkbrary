import React from "react";
import Left from "../../public/icons/left.svg";
import Right from "../../public/icons/right.svg";
import Image from "next/image";

interface PaginationProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 9;
  let startPage: number;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          activePageNum === 1
            ? "bg-[#F7F7F7] text-gray-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        <Image src={Left} alt="Previous" width={24} height={24} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            activePageNum === page
              ? "bg-[#F7F7F7] text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          activePageNum === totalPageNum
            ? "bg-[#F7F7F7] text-gray-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        <Image src={Right} alt="Next" width={24} height={24} />
      </button>
    </div>
  );
}