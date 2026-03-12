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
          content="A mother’s children go missing and a multi-state investigation reveals a disturbing timeline."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/background.jpg"
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
              A mother&apos;s children go missing and a multi-state investigation reveals a disturbing timeline.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            What began as concern for two missing children quickly turned into one of the most disturbing investigations in recent true-crime history. As officials tracked movements across multiple states, unanswered questions multiplied.
          </p>
          <p>
            Investigators examined financial records, phone data, and witness accounts while trying to establish a clear timeline. Public attention intensified as each update suggested the case was far more complex than a standard missing-person search.
          </p>
          <p>
            The case became a major legal and media focus, raising difficult conversations about accountability, motive, and warning signs missed along the way.
          </p>
        </section>

        <Forum episodeId="8" />
      </article>
    </>
  );
}
