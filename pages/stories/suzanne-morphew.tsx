import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function SuzanneMorphewStoryPage() {
  return (
    <>
      <Head>
        <title>Suzanne Morphew: The Colorado Disappearance | Hour of Justice</title>
        <meta
          name="description"
          content="A woman vanishes during Mother’s Day weekend in Colorado, launching years of investigation and public debate."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/suzanne_morphew.png"
              alt="Suzanne Morphew case"
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
            <h1 className={styles.title}>Suzanne Morphew: The Colorado Disappearance</h1>
            <p className={styles.logline}>
              A woman vanishes during Mother&apos;s Day weekend in Colorado, launching years of investigation and public debate.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Suzanne Morphew was reported missing from her Colorado neighborhood, and what initially appeared to be a local search quickly turned into a high-profile case followed nationwide.
          </p>
          <p>
            Investigators pieced together evidence from digital records, travel routes, and witness statements while the timeline remained heavily contested. The longer the case continued, the more attention centered on inconsistencies and unanswered questions.
          </p>
          <p>
            The investigation has remained a major topic in true crime due to its complex legal path and the ongoing focus on what happened in the final days before Suzanne disappeared.
          </p>
        </section>

        <Forum episodeId="10" />
      </article>
    </>
  );
}
