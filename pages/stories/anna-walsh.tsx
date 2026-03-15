import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function AnnaWalshStoryPage() {
  return (
    <>
      <Head>
        <title>Ana Walshe: A Disappearance Under Scrutiny | Hour of Justice</title>
        <meta
          name="description"
          content="A Massachusetts mother disappears at the start of the new year, setting off an investigation built around digital traces, timelines, and conflicting accounts."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/ana_walshe.png"
              alt="Ana Walshe case"
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
            <h1 className={styles.title}>Ana Walshe: A Disappearance Under Scrutiny</h1>
            <p className={styles.logline}>
              A Massachusetts mother disappears at the start of the new year, setting off an investigation built around digital traces, timelines, and conflicting accounts.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Ana Walshe was reported missing after she was expected to travel for work, prompting an extensive search across several locations in Massachusetts. As investigators traced her final known movements, the case quickly drew widespread attention both locally and nationally.
          </p>
          <p>
            The investigation soon focused on timelines, electronic records, and physical evidence gathered from places connected to her daily life. Public updates fueled intense discussion about what investigators had confirmed — and what questions still remained unanswered.
          </p>
          <p>
            Over time, the case became less about a single moment and more about reconstructing a sequence of events through digital footprints, movements, and decisions made in the days before her disappearance.
          </p>
        </section>

        <Forum episodeId="6" />
      </article>
    </>
  );
}
