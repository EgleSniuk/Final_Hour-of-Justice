
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface FeaturedVideoProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  storyHref?: string;
}

export default function FeaturedVideo({ title, description, thumbnailUrl, videoUrl, storyHref = '/' }: FeaturedVideoProps) {
  return (
    <div className={styles.container}>
      <Link href={storyHref} className={styles.link}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Story Spotlight</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <span className={styles.cta}>READ MORE →</span>
        </div>
        <div className={styles.thumbnailWrapper}>
          <Image src={thumbnailUrl} alt={title} className={styles.thumbnail} fill sizes="100vw" />
        </div>
      </Link>
    </div>
  );
}
