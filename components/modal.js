"use client";

import styles from "./modal.module.css";

export default function Modal({
  shown,
  setShown,
  heading,
  content,
  isError = false,
}) {
  return (
    <>
      {shown && (
        <div className={styles.container} onClick={(e) => setShown(false)}>
          <div className={styles.content}>
            <h1
              className={`${styles.heading} ${isError && styles.errorHeading}`}
            >
              {heading}
            </h1>
            <p className={styles.paragraph}>{content}</p>
          </div>
        </div>
      )}
    </>
  );
}
