"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Page.module.css";

export default function Form() {
  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="px-4 py-1 w-max bg-blue-600 text-white rounded-sm"
        type="button"
        onClick={() => {
          setIsFetching(!isFetching);
        }}
      >
        Invert
      </button>
      <Link className={styles.card} href="/">
        <span
          className={`text-bold text-xl ${
            isFetching ? "text-green-500" : "text-red-500"
          }`}
        >{`${isFetching}`}</span>
        <p>Find in-depth information about Next.js features and&nbsp;API.</p>
      </Link>
    </div>
  );
}
