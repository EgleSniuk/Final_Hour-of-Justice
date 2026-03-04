import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          &copy; {currentYear} Hour of Justice. All rights reserved.
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.iconLink} aria-label="Twitter">𝕏</a>
          <a href="#" className={styles.iconLink} aria-label="YouTube">▶</a>
          <a href="#" className={styles.iconLink} aria-label="Facebook">f</a>
          <a href="#" className={styles.iconLink} aria-label="Instagram">◉</a>
        </div>
      </div>
    </footer>
  );
}
