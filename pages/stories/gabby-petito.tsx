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
          content="A cross-country van journey takes a tragic turn, transforming a social media travel story into one of the most widely followed missing-person cases in recent years."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/gabby_petito.png"
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
              A cross-country van journey takes a tragic turn, transforming a social media travel story into one of the most widely followed missing-person cases in recent years.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Gabby Petito had been documenting a van-life journey across the United States, sharing photos and videos from the road with thousands of followers online. What appeared to be a story of adventure and freedom took a sudden and troubling turn when communication stopped and concern began to grow among her family.
          </p>
          <p>
            Investigators and search teams soon began working across multiple states to reconstruct the final days of the trip. Body-camera footage, witness statements, and digital location data became key pieces in understanding the timeline of events.
          </p>
          <p>
            The case quickly captured global attention, sparking wider conversations about domestic violence warning signs, media coverage of missing-person cases, and the powerful role online communities can play in helping investigations gain momentum.
          </p>
        </section>

        <Forum episodeId="7" />
      </article>
    </>
  );
}
