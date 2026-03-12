import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function DanMarkelStoryPage() {
  return (
    <>
      <Head>
        <title>The Murder of Dan Markel: A Plot Years in the Making | Hour of Justice</title>
        <meta
          name="description"
          content="He was a respected law professor with no known enemies — until investigators began uncovering the conflicts hidden behind his quiet life."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/dan_markel.png"
              alt="Dan Markel: The Professor Who Never Saw It Coming"
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
            <h1 className={styles.title}>The Murder of Dan Markel: A Plot Years in the Making</h1>
            <p className={styles.logline}>
              He was a respected law professor with no known enemies — until investigators began uncovering the conflicts hidden behind his quiet life.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Dan Markel was a brilliant legal scholar, a devoted father, and a respected voice in the academic world. Known for his sharp intellect and passionate teaching style, he appeared to live a life centered on law, family, and scholarship. But beneath that seemingly ordinary routine, personal tensions were quietly building.
          </p>
          <p>
            When Dan was found critically injured outside his home, investigators were left with a baffling question: who would want to harm a university professor with no obvious enemies? As detectives began reconstructing the events leading up to that morning, they discovered disputes and pressures that suggested his life had become far more complicated than it appeared.
          </p>
          <p>
            Over the years, a complex investigation revealed a web of connections, phone calls, and movements that slowly exposed a carefully orchestrated plan. Today, several people have been convicted in connection with Dan Markel&apos;s death, yet the origins of the plot — and the motivations behind it — remain one of the most debated aspects of the case.
          </p>
        </section>

        <Forum episodeId="3" />
      </article>
    </>
  );
}
