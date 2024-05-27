"use client";

import styles from "./footer.module.css";

export default function Footer() {
  function handleBackToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <footer className={styles.footer}>
      <a data-link onClick={handleBackToTop}>
        Back To Top
      </a>
    </footer>
  );
}
