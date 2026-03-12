import Head from 'next/head';
import Image from 'next/image';
import Forum from '../../components/Forum/Forum';
import styles from '../../styles/StoryPage.module.css';

const VIDEO_URL = 'https://www.youtube.com/@HourofJustice';

export default function KarenReadStoryPage() {
  return (
    <>
      <Head>
        <title>Karen Read: The Questions That Remain | Hour of Justice</title>
        <meta
          name="description"
          content="A Boston police officer is found in the snow after a night out, and the woman accused says the real answers may lie inside the house he never reached."
        />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.thumbnailWrap}>
            <Image
              src="/assets/karen_read.png"
              alt="Karen Read: The Questions That Remain"
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
            <h1 className={styles.title}>Karen Read: The Questions That Remain</h1>
            <p className={styles.logline}>
              A Boston police officer is found in the snow after a night out, and the woman accused says the real answers may lie inside the house he never reached.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Description (No Spoilers)</h2>
          <p>
            John O&apos;Keefe and Karen Read spent the evening with friends, moving from a lively bar to a quiet suburban neighborhood as the night wore on. Hours later, John was discovered unresponsive in the snow outside a home where several people had gathered — and what happened between those moments remains fiercely disputed.
          </p>
          <p>
            Karen Read was quickly accused of causing his death, but she maintained that investigators ignored crucial evidence and protected the people who were inside the house that night. Conflicting timelines, missing data, and unanswered questions soon divided the public in a way few cases in Massachusetts ever had.
          </p>
          <p>
            After two trials, Karen Read was acquitted and the criminal case was closed. What remains is a wrongful-death lawsuit — and a lingering question: what are the people inside that house still not saying?
          </p>
        </section>

        <Forum episodeId="4" />
      </article>
    </>
  );
}
