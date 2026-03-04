import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <Link href="/forum" className={styles.menuItem} onClick={onClose}>Topics</Link>
        <Link href="/forum" className={styles.menuItem} onClick={onClose}>Playlists</Link>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.menuItem} onClick={onClose}>Watch Live</a>
        <Link href="/about" className={styles.menuItem} onClick={onClose}>Socials</Link>
        <Link href="/about" className={styles.menuItem} onClick={onClose}>Contact</Link>
        <Link href="/login" className={styles.menuItem} onClick={onClose}>Support</Link>
        <Link href="/login" className={styles.menuItem} onClick={onClose}>Sign In</Link>
      </aside>
    </div>
  );
}
