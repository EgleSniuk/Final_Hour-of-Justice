import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function BryanKohbergerStoryPage() {
  return (
    <>
      <Head>
        <title>Bryan Kohberger: The Night That Changed Moscow | Hour of Justice</title>
        <meta
          name="description"
          content="A quiet college town in Idaho is shaken after four students are found dead, sparking a nationwide investigation."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/background.jpg"
              alt="Bryan Kohberger case"
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
            <h1 className={styles.title}>Bryan Kohberger: The Night That Changed Moscow</h1>
            <p className={styles.logline}>
              A quiet college town in Idaho is shaken after four students are found dead, sparking a nationwide investigation.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            In November 2022, the city of Moscow, Idaho, became the center of international headlines after four University of Idaho students were found dead in an off-campus house. The tragedy shocked the community and raised urgent questions about how such a violent crime could happen in a town known for its calm atmosphere.
          </p>
          <p>
            As investigators worked to reconstruct the timeline, attention turned to digital evidence, surveillance footage, and vehicle movements in the hours surrounding the incident. Weeks of uncertainty followed as families, students, and the public waited for updates.
          </p>
          <p>
            When an arrest was finally made, the case shifted into a new phase focused on evidence, legal process, and the challenge of separating rumor from verified facts.
          </p>
        </section>

        <Forum episodeId="5" />
      </article>
    </>
  );
}
