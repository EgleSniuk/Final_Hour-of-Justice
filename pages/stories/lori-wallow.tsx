import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function LoriWallowStoryPage() {
  return (
    <>
      <Head>
        <title>Lori Vallow: The Case That Shocked Idaho | Hour of Justice</title>
        <meta
          name="description"
          content="Two children vanish, and a multi-state investigation begins to uncover a timeline far more disturbing than anyone first imagined."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/lori_vallow.png"
              alt="Lori Vallow case"
              fill
              className={styles.thumbnail}
              sizes="(max-width: 900px) 100vw, 520px"
              priority
            />

            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.playButton}
              aria-label="Watch on YouTube"
            >
              ▶
            </a>
          </div>

          <div className={styles.heroText}>
            <p className={styles.kicker}>Case File</p>
            <h1 className={styles.title}>Lori Vallow: The Case That Shocked Idaho</h1>
            <p className={styles.logline}>
              Two children vanish, and a multi-state investigation begins to uncover a timeline far more disturbing than anyone first imagined.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            What began as concern for two missing children soon developed into one of the most unsettling investigations in recent true-crime history. As authorities traced movements across several states, the number of unanswered questions continued to grow.
          </p>
          <p>
            Investigators examined financial records, phone data, and witness accounts while attempting to reconstruct the sequence of events. With each new development, public attention intensified as the case appeared increasingly complex and troubling.
          </p>
          <p>
            Over time, the investigation evolved into a major legal and media focus, raising difficult questions about accountability, motive, and the warning signs that may have been overlooked.
          </p>
        </section>

        <Forum episodeId="8" />
      </article>
    </>
  );
}
