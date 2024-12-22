import Link from "next/link";
import { formatUpdatedAt } from "@/utils/date";
import Image from "next/image";
import Placeholder from "../../../public/images/image 7.png"
import StarEmpty from "../../../public/icons/ic_star_empty.svg"
import StarFill from "../../../public/icons/ic_star_fill.svg"
// import kebab from "../../../public/icons/ic_kebab.svg"
import { useState } from "react";
import { deleteLink, putFavoriteLink, putLink } from "@/api/api";
import { useRouter } from "next/router";
import Dropdown from "@/components/Dropdown";

interface CardProps {
  title: string;
  description: string;
  createdAt: Date;
  imageSource?: string;
  linkId: number; 
  url: string;
  fallbackImage?: string; 
  isEditable: boolean; // 외부에서 전달받기
}

const Card = ({
  title,
  description,
  createdAt,
  linkId, 
  url,
  imageSource,
  isEditable,
}: CardProps) => {
  const fallbackImage = Placeholder; // 대체 이미지 경로

  const router = useRouter();
  // const isEditable = router.pathname === "/link"; // TODO: 외부에서 할 수 있도록, 프롭스로 분리형 값으로 수정하기

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // API 호출 중 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFavorite = async () => {
    if (isLoading) return; // 중복 방지
    setIsLoading(true);

    try {
      if (isSubscribed) {
        // 즐겨찾기 해제
        await deleteLink(linkId);
      } else {
        // 즐겨찾기 추가
        await putFavoriteLink(linkId);
      }
      setIsSubscribed(!isSubscribed); // 상태 업데이트
    } catch (error) {
      console.error(`실패 ${linkId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (linkId: number, currentTitle: string, currentUrl: string) => {
    const newTitle = prompt("새로운 제목을 입력하세요:", currentTitle);
    const newUrl = prompt("새로운 링크를 입력하세요:", currentUrl);
    
    if (newTitle && newUrl) {
      try {
        await putLink(linkId, { title: newTitle, url: newUrl });
        alert("수정이 완료되었습니다.");
        router.reload(); // 페이지 새로고침, 임시방편
        // TODO: 수정 후 재렌더링
      } catch (error) {
        console.error(`수정 실패 ${linkId}:`, error);
      }
    }
  };

  const handleDelete = async (linkId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteLink(linkId);
        alert("삭제가 완료되었습니다.");
        router.reload(); // 페이지 새로고침, 임시방편
        // TODO: 삭제 후 재렌더링
      } catch (error) {
        console.error(`삭제 실패 ${linkId}:`, error);
      }
    }
  };

  return (
    <div className="rounded-lg">
      <Link href="/상세페이지"> 
        <div>
          <div>
            <Image 
              src={imageSource || fallbackImage}
              alt={title}
              layout="responsive"
              width={340}
              height={200}
            />
            {/* 링크 페이지일 때만 즐겨찾기 버튼 렌더링 */}
            {isEditable && (
              <div onClick={handleFavorite}>
                <Image
                  src={isSubscribed ? StarEmpty : StarFill}
                  width={32}
                  height={32}
                  alt="즐겨찾기 버튼"
                />
              </div>
            )}
          </div>

        </div>
        <div>
          <p className="text-[13px] text-[#666666]">{formatUpdatedAt(createdAt)}</p>
          {/* 링크 페이지일 때만 케밥 랜더링 */}
          {isEditable && (
            <div>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {/* <Image src={kebab} alt="kebab" width={21} height={17} /> */}
                <Dropdown
                linkId={linkId}
                onEdit={(linkId) => handleEdit(linkId, title, url)} // 수정 시 제목과 URL 전달
                onDelete={handleDelete}
              />
              </button>
            </div>
          )}
          <p className="text-[16px] text-[#000000]">{title}</p>
          <p className="text-[16px] text-[#000000]">{description}</p>
          <p className="text-[14px] text-[#333333]">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card;