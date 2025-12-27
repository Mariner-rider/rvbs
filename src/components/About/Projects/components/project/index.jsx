import React from "react";
import styles from "./style.module.scss";

export default function Project({ index, title, manageModal }) {
  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <h2 className={`${styles.heading}`}>{title}</h2>
      <p className={`${styles.para}`}>Design & Development</p>
    </div>
  );
}
