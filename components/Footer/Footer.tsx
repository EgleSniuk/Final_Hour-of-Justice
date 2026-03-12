import React from 'react';
import Image from 'next/image';
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
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="TikTok"
          >
            <Image src="/assets/tiktok.png" alt="TikTok" width={22} height={22} className={styles.iconImage} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="Instagram"
          >
            <Image src="/assets/instagram.png" alt="Instagram" width={22} height={22} className={styles.iconImage} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="Twitter"
          >
            <Image src="/assets/twitter.png" alt="Twitter" width={22} height={22} className={styles.iconImage} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="Facebook"
          >
            <Image src="/assets/facebook.png" alt="Facebook" width={22} height={22} className={styles.iconImage} />
          </a>
        </div>
      </div>
    </footer>
  );
}
