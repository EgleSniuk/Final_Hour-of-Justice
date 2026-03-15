import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function KelseyBerretStoryPage() {
  return (
    <>
      <Head>
        <title>Kouri Richins: The Poisoned Husband Case | Hour of Justice</title>
        <meta
          name="description"
          content="A Utah mother and author is accused of poisoning her husband, turning a seemingly ordinary tragedy into a case filled with disturbing questions."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/kouri_richins.png"
              alt="Kouri Richins case"
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
            <h1 className={styles.title}>Kouri Richins: The Poisoned Husband Case</h1>
            <p className={styles.logline}>
              A Utah mother and author is accused of poisoning her husband, turning a seemingly ordinary tragedy into a case filled with disturbing questions.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Story Overview</h2>
          <p>
            Kouri Richins first appeared in the public eye after publishing a children&apos;s book about coping with grief following the sudden death of her husband. What initially seemed like a story about loss and healing soon became the focus of a major criminal investigation.
          </p>
          <p>
            Authorities began reviewing financial records, digital communications, and witness statements while reexamining the circumstances surrounding her husband&apos;s death. As investigators gathered more evidence, the timeline and motives behind the case became increasingly complex.
          </p>
          <p>
            The investigation quickly gained national attention, raising difficult questions about trust, financial pressures, and the hidden circumstances that may exist behind a seemingly normal family life.
          </p>
        </section>

        <Forum episodeId="9" />
      </article>
    </>
  );
}
