import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getQuestions } from '../../lib/api';
import { QuestionItem } from '../../types/forum';
import styles from './styles.module.css';

type ForumProps = {
  episodeId: string;
};

function toTimestamp(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDateTime(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleString();
}

function stripEpisodeTag(questionText: string): string {
  return questionText.replace(/^\[EP:[^\]]+\]\s*/, '');
}

function extractEpisodeId(questionText: string): string | null {
  const match = questionText.match(/^\[EP:([^\]]+)\]\s*/);
  return match ? match[1] : null;
}

export default function Forum({ episodeId }: ForumProps) {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getQuestions('all', 'all')
      .then((data) => {
        if (!active) return;
        const filtered = data
          .filter((question) => extractEpisodeId(question.question_text) === episodeId)
          .sort((first, second) => toTimestamp(second.date) - toTimestamp(first.date));
        setQuestions(filtered);
      })
      .catch(() => {
        if (!active) return;
        setQuestions([]);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [episodeId]);

  const forumHref = useMemo(() => `/forum?episode=${episodeId}`, [episodeId]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Discussion Questions</h2>
      {loading ? (
        <p className={styles.loading}>Loading forum questions...</p>
      ) : (
        <ul className={styles.questionList}>
          {questions.length > 0 ? (
            questions.slice(0, 5).map((question) => (
              <li key={question.id}>
                <Link href={forumHref} className={styles.questionLink}>
                  {stripEpisodeTag(question.question_text)}
                </Link>
                <div className={styles.questionMeta}>Asked {formatDateTime(question.date)}</div>
              </li>
            ))
          ) : (
            <li>No questions yet for this episode.</li>
          )}
        </ul>
      )}
      <Link href={forumHref} className={styles.openButton}>
        Open Episode Q&amp;A
      </Link>
    </section>
  );
}
