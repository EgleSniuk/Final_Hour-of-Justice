import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const episodes = [
  {
    href: '/stories/casey-anthony',
    title: 'The Web of Lies: Casey Anthony',
    thumbnail: '/assets/casey_anthony.png',
  },
  {
    href: '/stories/jodi-arias',
    title: 'Jodi Arias: When Love Became Obsession',
    thumbnail: '/assets/jodi_arias.png',
  },
  {
    href: '/stories/dan-markel',
    title: 'Dan Markel: The Professor Who Never Saw It Coming',
    thumbnail: '/assets/dan_markel.png',
  },
  {
    href: '/stories/karen-read',
    title: 'Karen Read: The Questions That Remain',
    thumbnail: '/assets/karen_read.png',
  },
  {
    href: '/stories/bryan-kohberger',
    title: 'Bryan Kohberger: The Night That Changed Moscow',
    thumbnail: '/assets/bryan_kohberger.png',
  },
  {
    href: '/stories/anna-walsh',
    title: 'Ana Walshe: A Disappearance Under Scrutiny',
    thumbnail: '/assets/ana_walshe.png',
  },
  {
    href: '/stories/gabby-petito',
    title: 'Gabby Petito: The Road Trip That Stopped',
    thumbnail: '/assets/gabby_petito.png',
  },
  {
    href: '/stories/lori-wallow',
    title: 'Lori Vallow: The Case That Shocked Idaho',
    thumbnail: '/assets/lori_vallow.png',
  },
  {
    href: '/stories/kelsey-berret',
    title: 'Kouri Richins: The Poisoned Husband Case',
    thumbnail: '/assets/kouri_richins.png',
  },
  {
    href: '/stories/suzanne-morphew',
    title: 'Suzanne Morphew: The Colorado Disappearance',
    thumbnail: '/assets/suzanne_morphew.png',
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isEpisodesOpen, setIsEpisodesOpen] = useState(false);

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

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsEpisodesOpen((prev) => !prev)}
        >
          ALL EPISODES
        </button>

        {isEpisodesOpen ? (
          <div className={styles.episodesList}>
            {episodes.map((episode) => (
              <Link key={episode.href} href={episode.href} className={styles.episodeItem} onClick={onClose}>
                <Image
                  src={episode.thumbnail}
                  alt={episode.title}
                  width={72}
                  height={44}
                  className={styles.episodeThumbnail}
                />
                <span className={styles.episodeTitle}>{episode.title}</span>
              </Link>
            ))}
          </div>
        ) : null}

        <Link href="/forum" className={styles.menuItem} onClick={onClose}>
          LET&apos;S CHAT
        </Link>

        <div className={styles.socials}>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
            <Image src="/assets/tiktok.png" alt="TikTok" width={20} height={20} className={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
            <Image src="/assets/instagram.png" alt="Instagram" width={20} height={20} className={styles.socialIcon} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
            <Image src="/assets/twitter.png" alt="Twitter" width={20} height={20} className={styles.socialIcon} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
            <Image src="/assets/facebook.png" alt="Facebook" width={20} height={20} className={styles.socialIcon} />
          </a>
        </div>
      </aside>
    </div>
  );
}
