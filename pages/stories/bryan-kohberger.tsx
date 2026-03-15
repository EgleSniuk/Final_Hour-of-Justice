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
          content="A quiet college town in Idaho is shaken after four university students are found dead, triggering an investigation that quickly draws national and international attention."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/bryan_kohberger.png"
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
              A quiet college town in Idaho is shaken after four university students are found dead, triggering an investigation that quickly draws national and international attention.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            In November 2022, the city of Moscow, Idaho, was thrust into the spotlight after four University of Idaho students were discovered dead inside an off-campus home. The tragedy stunned the community and raised urgent questions about how such a violent crime could occur in a town long known for its peaceful atmosphere.
          </p>
          <p>
            As investigators worked to piece together the events of that night, the focus turned to surveillance footage, digital evidence, and vehicle movements in the hours surrounding the incident. Weeks passed with few answers, leaving families, students, and the wider public anxiously awaiting developments in the case.
          </p>
          <p>
            When an arrest was eventually made, the investigation entered a new stage — one centered on evidence, legal proceedings, and the challenge of separating speculation from confirmed facts.
          </p>
        </section>

        <Forum episodeId="5" />
      </article>
    </>
  );
}
