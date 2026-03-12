import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function KelseyBerretStoryPage() {
  return (
    <>
      <Head>
        <title>Kelsey Berret: The Missing Mother Case | Hour of Justice</title>
        <meta
          name="description"
          content="A young mother disappears in Colorado, triggering a case built on digital clues and conflicting statements."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/background.jpg"
              alt="Kelsey Berret case"
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
            <h1 className={styles.title}>Kelsey Berret: The Missing Mother Case</h1>
            <p className={styles.logline}>
              A young mother disappears in Colorado, triggering a case built on digital clues and conflicting statements.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Kelsey Berret&apos;s disappearance raised immediate concern among family and investigators. In the days that followed, the focus shifted from search efforts to reconstructing her final known contacts and movements.
          </p>
          <p>
            Law enforcement worked through phone activity, location evidence, and witness testimony to determine what happened. Each development reshaped the timeline and drew national attention.
          </p>
          <p>
            The case became a difficult example of how quickly a missing-person report can evolve into a major criminal investigation.
          </p>
        </section>

        <Forum episodeId="9" />
      </article>
    </>
  );
}
