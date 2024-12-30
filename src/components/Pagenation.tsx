import React from "react";
import Left from "../../public/icons/left.svg";
import LeftActive from "../../public/icons/left_active.svg"
import Right from "../../public/icons/right.svg";
import RightActive from "../../public/icons/right_active.svg";
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
        onClick={() => onPageChange(activePageNum - 1)}
        className={`flex items-center justify-center rounded-md ${
          activePageNum > 1 ? "text-black" : "pointer-events-none"}`}
        disabled={activePageNum <= 1}
      >
        <Image
          src={
            activePageNum > 1
              ? LeftActive
              : Left
          }
          width={48}
          height={48}
          alt="Previous"
          className="lg:w-[48px] lg:h-[48px] w-[34px] h-[34px]" 
        />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`lg:w-[48px] lg:h-[48px] w-[34px] h-[34px] lg:text-[18px] text-[16px] flex items-center justify-center rounded-md bg-[#F7F7F7] ${
            activePageNum === page
              ? "text-black font-bold" : "text-[#C4C4C4]"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(activePageNum + 1)}
        className={`flex items-center justify-center rounded-md ${
          activePageNum < totalPageNum ? " text-black" : "pointer-events-none"}`}
        disabled={activePageNum >= totalPageNum}
      >
        <Image
          src={
            activePageNum < totalPageNum
              ? RightActive
              : Right
          }
          width={48}
          height={48}
          alt="Next"
          className="lg:w-[48px] lg:h-[48px] w-[34px] h-[34px]" 
        />
      </button>
    </div>
  );
}