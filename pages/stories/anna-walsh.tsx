import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function AnnaWalshStoryPage() {
  return (
    <>
      <Head>
        <title>Anna Walsh: A Disappearance Under Scrutiny | Hour of Justice</title>
        <meta
          name="description"
          content="A Massachusetts mother disappears at the start of the year, leading to an investigation built around digital traces and conflicting statements."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/background.jpg"
              alt="Anna Walsh case"
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
            <h1 className={styles.title}>Anna Walsh: A Disappearance Under Scrutiny</h1>
            <p className={styles.logline}>
              A Massachusetts mother disappears at the start of the year, leading to an investigation built around digital traces and conflicting statements.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Anna Walsh was reported missing after plans to travel for work, and the search quickly expanded across multiple locations. As investigators followed her final known movements, the case drew widespread attention across Massachusetts and beyond.
          </p>
          <p>
            The investigation focused heavily on timelines, electronic records, and physical evidence gathered from places connected to her daily life. Public updates prompted intense discussion about what was confirmed and what remained uncertain.
          </p>
          <p>
            Over time, the case became less about a single moment and more about piecing together a larger sequence of actions, decisions, and digital footprints.
          </p>
        </section>

        <Forum episodeId="6" />
      </article>
    </>
  );
}
