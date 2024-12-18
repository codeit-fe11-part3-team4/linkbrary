import Link from "next/link";
import { formatUpdatedAt } from "@/utils/date";
import Image from "next/image";
import Placeholder from "../../../public/images/image 7.png"
import StarEmpty from "../../../public/icons/ic_star_empty.svg"
import StarFill from "../../../public/icons/ic_star_fill.svg"
import kebab from "../../../public/icons/ic_kebab.svg"
import { useState } from "react";
import { deleteLink, putFavoriteLink } from "@/api/api";
import { useRouter } from "next/router";

interface CardProps {
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl?: string;
  linkId: number; 
  fallbackImage?: string; // 대체 이미지 경로
}

const Card = ({
  title,
  description,
  createdAt,
  linkId, 
  imageUrl,
}: CardProps) => {
  const fallbackImage = Placeholder; // 대체 이미지 경로

  const router = useRouter();
  const onlyLink = router.pathname === "/link";

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // API 호출 중 상태 관리

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
      console.error(`Failed to toggle favorite for link ${linkId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg">
      <Link href="/상세페이지"> 
        <div>
          <div>
            <Image 
              src={imageUrl || fallbackImage}
              alt={title}
              layout="responsive"
              width={340}
              height={200}
            />
            {/* 링크 페이지일 때만 즐겨찾기 버튼 렌더링 */}
            {onlyLink && (
              <div onClick={handleFavorite}>
                <Image
                  src={
                    isSubscribed ? StarEmpty : StarFill
                  }
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
          {onlyLink && (
            <div>
              <button>
                <Image src={kebab} alt="kebab" width={21} height={17} />
                {/* TODO: 드롭다운 추가 */}
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