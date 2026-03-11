import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://youtube.com';

export default function CaseyAnthonyStoryPage() {
  return (
    <>
      <Head>
        <title>The Web of Lies: Casey Anthony | Hour of Justice</title>
        <meta
          name="description"
          content="Casey Anthony story card: 31 Days of Silence."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/casey_anthony.png"
              alt="Casey Anthony - 31 Days of Silence"
              fill
              className={styles.thumbnail}
              sizes="(max-width: 900px) 100vw, 520px"
              priority
            />
          </div>

          <div className={styles.heroText}>
            <p className={styles.kicker}>Case File</p>
            <h1 className={styles.title}>The Web of Lies: Casey Anthony</h1>
            <p className={styles.logline}>
              A young mother stays silent for 31 days after her daughter disappears, leaving behind a trail of contradictions and unanswered questions.
            </p>

            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              Watch on YouTube
            </a>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            When two-year-old Caylee vanished, her mother Casey did not report her missing. Instead, she moved through her days as if nothing had changed — smiling in photos, spending nights out, and offering explanations that shifted every time someone asked where her daughter was. Those 31 days became the center of one of the most scrutinized cases in America.
          </p>
          <p>
            This episode traces the final confirmed moments of Caylee&rsquo;s life, the strange behavior that followed, and the first cracks in Casey&rsquo;s story as family members and investigators began to question what was really happening. Every detail — from the abandoned car to the mysterious &ldquo;nanny&rdquo; — deepened the confusion rather than clearing it.
          </p>
          <p>
            What began as a missing-child report quickly spiraled into a national obsession. The truth behind those 31 days remains one of the most debated mysteries in modern true crime.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Discussion Questions</h2>
          <ul className={styles.questionList}>
            <li>What detail in the first 31 days raises the biggest red flag for you?</li>
            <li>How did public perception shape the investigation and media narrative?</li>
            <li>Which unanswered question from this case still feels the most important?</li>
          </ul>
          <Link href="/forum" className={styles.secondaryButton}>
            Let&apos;s Chat in Forum
          </Link>
        </section>

      </article>
    </>
  );
}
