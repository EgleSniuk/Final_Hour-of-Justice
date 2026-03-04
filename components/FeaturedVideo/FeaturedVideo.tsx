import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface FeaturedVideoProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export default function FeaturedVideo({ title, description, thumbnailUrl, videoUrl }: FeaturedVideoProps) {
  return (
    <div className={styles.container}>
      <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <div className={styles.thumbnailWrapper}>
          <Image src={thumbnailUrl} alt={title} className={styles.thumbnail} fill sizes="100vw" />
          <div className={styles.playIcon}>▶</div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </a>
    </div>
  );
}
