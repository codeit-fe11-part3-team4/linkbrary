"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./AddLinkButton.module.css";

const AddLinkButton = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken);
  }, []);

  const link = token ? "/links" : "/login";

  return (
    <Link href={link} className={styles["add-link-button"]}>
      링크 추가하기
    </Link>
  );
};

export default AddLinkButton;