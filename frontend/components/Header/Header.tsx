import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.burgerButton} onClick={onMenuClick}>
          ☰
        </button>
      </div>
      
      <div className={styles.center}>
        <Link href="/" className={styles.brandLink}>
          <span className={styles.brandText}>HOUR OF JUSTICE</span>
        </Link>
      </div>
      
      <nav className={styles.right}>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/forum" className={styles.link}>Let&apos;s Chat</Link>
        <Link href="https://youtube.com" target="_blank" className={`${styles.link} ${styles.youtubeIcon}`}>
          ▶ Channel
        </Link>
        <Link href="/login" className={styles.link}>Support</Link>
        <Link href="/login" className={styles.link}>Sign In</Link>
      </nav>
    </header>
  );
}
