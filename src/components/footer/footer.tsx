"use client";

import styles from "./footer.module.css";

export default function Footer({ right }: { right?: React.ReactNode }) {
  function handleBackToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <footer className={styles.footer}>
      <div style={{ textAlign: "left" }}>
        <a data-link onClick={handleBackToTop}>
          Back To Top
        </a>
      </div>
      {right}
    </footer>
  );
}
