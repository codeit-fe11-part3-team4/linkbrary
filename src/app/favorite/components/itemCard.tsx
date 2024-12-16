import Link from "next/link";
import { formatUpdatedAt } from "@/utils/date";
import Image from "next/image";
import Placeholder from "../../../../public/images/image 7.png"

interface CardProps {
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl?: string;
  fallbackImage?: string; // 대체 이미지 경로
}

const ItemCard = ({
  title,
  description,
  createdAt,
  imageUrl,
}: CardProps) => {
  const fallbackImage = Placeholder; // 대체 이미지 경로

  return (
    <div className="rounded-lg">
      <Link href="/상세페이지"> 
        <div>
          <Image 
            src={imageUrl || fallbackImage}
            alt={title}
            layout="responsive"
            width={340}
            height={200}
          />
        </div>
        <div>
          <p className="text-[13px] text-[#666666]">{formatUpdatedAt(createdAt)}</p>
          <p className="text-[16px] text-[#000000]">{title}</p>
          <p className="text-[16px] text-[#000000]">{description}</p>
          <p className="text-[14px] text-[#333333]">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  )
}

export default ItemCard;