import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function GabbyPetitoStoryPage() {
  return (
    <>
      <Head>
        <title>Gabby Petito: The Road Trip That Stopped | Hour of Justice</title>
        <meta
          name="description"
          content="A cross-country van journey turns into a missing-person case that captures global attention and raises urgent questions."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/background.jpg"
              alt="Gabby Petito case"
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
            <h1 className={styles.title}>Gabby Petito: The Road Trip That Stopped</h1>
            <p className={styles.logline}>
              A cross-country van journey turns into a missing-person case that captures global attention and raises urgent questions.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Gabby Petito documented a van-life trip across the United States, sharing moments from the road through social media. What appeared to be a travel story shifted dramatically when communication stopped and concern grew among family and followers.
          </p>
          <p>
            Investigators and search teams worked across state lines to reconstruct the final days of the trip. Body-camera footage, witness accounts, and location data became central pieces in understanding the timeline.
          </p>
          <p>
            The case sparked widespread conversations about domestic violence warning signs, media attention, and how rapidly online communities can mobilize during missing-person investigations.
          </p>
        </section>

        <Forum episodeId="7" />
      </article>
    </>
  );
}
