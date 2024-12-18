import Image from 'next/image';
import { useState } from 'react';
import kebab from "../../public/icons/ic_kebab.svg";

interface DropdownProps {
  linkId: number;
  onEdit: (linkId: number) => void;
  onDelete: (linkId: number) => void;
}

const Dropdown = ({ linkId, onEdit, onDelete }: DropdownProps ) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    onEdit(linkId);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(linkId);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <Image src={kebab} alt="kebab" width={21} height={17} />
      </button>
      {isOpen && (
        <ul>
          <li onClick={handleEdit}>
            수정하기
          </li>
          <li onClick={handleDelete}>
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
