import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function JodiAriasStoryPage() {
  return (
    <>
      <Head>
        <title>Jodi Arias: When Love Became Obsession | Hour of Justice</title>
        <meta
          name="description"
          content="Jodi Arias and Travis Alexander story card."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/jodi_arias.png"
              alt="Jodi Arias and Travis Alexander"
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
            <h1 className={styles.title}>Jodi Arias: When Love Became Obsession</h1>
            <p className={styles.logline}>
              What began as a passionate relationship slowly turned into an obsession that neither of them could escape.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Jodi Arias and Travis Alexander shared a relationship that was intense, complicated, and full of contradictions. Friends saw moments of affection and devotion, but also emotional distance, jealousy, and repeated breakups. Their lives moved in different directions, yet they kept finding their way back to each other.
          </p>
          <p>
            Behind the surface, the relationship was becoming increasingly unstable. Private conflicts, shifting expectations, and secrets created tension that neither seemed able to resolve. Those close to them sensed the volatility but never imagined how serious it might become.
          </p>
          <p>
            What followed shocked their community and captured national attention. As investigators began to piece together the final days of their relationship, a story of love, obsession, and betrayal slowly began to emerge.
          </p>
        </section>

        <Forum episodeId="2" />
      </article>
    </>
  );
}
