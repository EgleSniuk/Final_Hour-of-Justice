import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { clearAuth, getUser } from '../../lib/auth';
import styles from './styles.module.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsSignedIn(!!getUser());
  }, [router.asPath]);

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    clearAuth();
    setIsSignedIn(false);
    setIsMenuOpen(false);
    router.push('/login');
  };

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

      <div className={styles.mobileRight}>
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-main-menu"
        >
          MENU
        </button>
      </div>
      
      <nav className={styles.right}>
        <Link href="/" className={styles.link}>HOME</Link>
        <Link href="https://www.youtube.com/@HourofJustice" target="_blank" className={`${styles.link} ${styles.youtubeIcon}`}>
          ▶ CHANNEL
        </Link>
        <Link href="/forum" className={styles.link}>LET&apos;S CHAT</Link>
        {isSignedIn ? (
          <button type="button" className={`${styles.link} ${styles.linkButton}`} onClick={handleSignOut}>
            SIGN OUT
          </button>
        ) : (
          <Link href="/login" className={styles.link}>SIGN IN</Link>
        )}
      </nav>

      {isMenuOpen ? (
        <nav id="mobile-main-menu" className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>HOME</Link>
          <Link href="https://www.youtube.com/@HourofJustice" target="_blank" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>
            CHANNEL
          </Link>
          <Link href="/forum" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>LET&apos;S CHAT</Link>
          {isSignedIn ? (
            <button type="button" className={`${styles.mobileMenuLink} ${styles.linkButton}`} onClick={handleSignOut}>
              SIGN OUT
            </button>
          ) : (
            <Link href="/login" className={styles.mobileMenuLink} onClick={handleMobileLinkClick}>SIGN IN</Link>
          )}
        </nav>
      ) : null}
    </header>
  );
}
