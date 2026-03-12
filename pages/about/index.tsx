import Head from 'next/head';
import styles from '../../styles/StoryPage.module.css';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Hour of Justice</title>
      </Head>
      <article className={styles.page}>
        <section className={styles.section}>
          <h1>About Hour of Justice</h1>
          <p>
            Hour of Justice is a true-crime documentary project dedicated to examining some of the most complex and controversial criminal cases of our time. Through careful research and clear storytelling, the series explores the events, relationships, and decisions that shaped each case — often revealing how the truth is far more complicated than the headlines suggest.
          </p>
          <p>
            Each episode focuses on the human stories behind the investigations: the lives affected, the unanswered questions, and the moments that changed everything. Rather than sensationalizing tragedy, Hour of Justice aims to present these cases with balance, context, and respect for the people involved.
          </p>
          <p>
            From widely known trials to cases still surrounded by debate, the goal is simple: to look closely at the details, follow the evidence, and ask the questions that remain.
          </p>
          <p>
            Because sometimes the most important part of justice is understanding the story.
          </p>
        </section>
      </article>
    </>
  );
}
