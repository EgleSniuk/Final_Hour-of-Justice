import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  storyHref?: string;
}

export default function VideoCard({ title, description, thumbnailUrl, videoUrl, storyHref }: VideoCardProps) {
  return (
    <article className={styles.card}>
      {storyHref ? (
        <Link href={storyHref} className={styles.link}>
          <div className={styles.thumbnailWrapper}>
            <Image src={thumbnailUrl} alt={title} className={styles.thumbnail} fill sizes="(max-width: 900px) 100vw, 33vw" />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
        </Link>
      ) : (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <div className={styles.thumbnailWrapper}>
            <Image src={thumbnailUrl} alt={title} className={styles.thumbnail} fill sizes="(max-width: 900px) 100vw, 33vw" />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
        </a>
      )}
    </article>
  );
}
