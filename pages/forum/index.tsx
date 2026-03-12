import Head from 'next/head';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  createAnswer,
  createQuestion,
  deleteAnswer,
  deleteQuestion,
  getAnswers,
  getQuestions,
  reactToAnswer
} from '../../lib/api';
import { videos } from '../../data/videos';
import { getToken, getUser } from '../../lib/auth';
import { AnswerItem, AuthUser, QuestionItem } from '../../types/forum';
import styles from '../../styles/ForumPage.module.css';

type Filter = 'all' | 'answered' | 'unanswered';

function toTimestamp(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDateTime(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleString();
}

export default function ForumPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, AnswerItem[]>>({});
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [newQuestionByEpisode, setNewQuestionByEpisode] = useState<Record<string, string>>({});
  const [newAnswerByQuestion, setNewAnswerByQuestion] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const EPISODE_TAG_PREFIX = '[EP:';

  function buildEpisodeTaggedQuestion(episodeId: string, text: string) {
    return `${EPISODE_TAG_PREFIX}${episodeId}] ${text}`;
  }

  function extractEpisodeId(questionText: string): string | null {
    const match = questionText.match(/^\[EP:([^\]]+)\]\s*/);
    return match ? match[1] : null;
  }

  function stripEpisodeTag(questionText: string): string {
    return questionText.replace(/^\[EP:[^\]]+\]\s*/, '');
  }

  const questionsByEpisode = useMemo(() => {
    const grouped: Record<string, QuestionItem[]> = {};
    for (const video of videos) {
      grouped[video.id] = [];
    }

    for (const question of questions) {
      const episodeId = extractEpisodeId(question.question_text);
      if (episodeId && grouped[episodeId]) {
        grouped[episodeId].push(question);
      }
    }

    for (const key of Object.keys(grouped)) {
      grouped[key].sort((first, second) => toTimestamp(second.date) - toTimestamp(first.date));
    }

    return grouped;
  }, [questions]);

  async function loadQuestions(currentFilter: Filter) {
    const data = await getQuestions(currentFilter, 'all');
    setQuestions(data);
  }

  useEffect(() => {
    setToken(getToken());
    setUser(getUser());
  }, []);

  useEffect(() => {
    setError('');
    loadQuestions(filter).catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load questions');
    });
  }, [filter]);

  useEffect(() => {
    if (!router.isReady) return;

    const episodeParam = router.query.episode;
    const episodeId = Array.isArray(episodeParam) ? episodeParam[0] : episodeParam;
    if (!episodeId) return;

    const exists = videos.some((video) => video.id === episodeId);
    if (!exists) return;

    setActiveEpisodeId(episodeId);
    setExpandedQuestionId(null);
  }, [router.isReady, router.query.episode]);

  async function handleCreateQuestion(event: FormEvent, episodeId: string) {
    event.preventDefault();
    if (!token) {
      setError('You must be signed in.');
      return;
    }

    const questionText = (newQuestionByEpisode[episodeId] || '').trim();
    if (questionText.length < 10) {
      setError('Question must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await createQuestion(token, buildEpisodeTaggedQuestion(episodeId, questionText), 'General');
      setNewQuestionByEpisode((prev) => ({ ...prev, [episodeId]: '' }));
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!token) return;

    try {
      await deleteQuestion(token, questionId);
      if (expandedQuestionId === questionId) {
        setExpandedQuestionId(null);
      }
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to delete question');
    }
  }

  async function toggleAnswers(questionId: string) {
    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(null);
      return;
    }

    setExpandedQuestionId(questionId);
    try {
      const data = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: data }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load answers');
    }
  }

  async function handleCreateAnswer(questionId: string, event: FormEvent) {
    event.preventDefault();
    if (!token) {
      setError('You must be signed in.');
      return;
    }

    const answerText = (newAnswerByQuestion[questionId] || '').trim();
    if (answerText.length < 2) {
      setError('Answer must be at least 2 characters long.');
      return;
    }

    try {
      await createAnswer(token, questionId, answerText);
      setNewAnswerByQuestion((prev) => ({ ...prev, [questionId]: '' }));
      const updatedAnswers = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: updatedAnswers }));
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to add answer');
    }
  }

  async function handleDeleteAnswer(questionId: string, answerId: string) {
    if (!token) return;
    try {
      await deleteAnswer(token, answerId);
      const updatedAnswers = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: updatedAnswers }));
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to delete answer');
    }
  }

  async function handleReaction(questionId: string, answerId: string, type: 'like' | 'dislike') {
    if (!token) {
      setError('You must be signed in.');
      return;
    }

    try {
      await reactToAnswer(token, answerId, type);
      const updatedAnswers = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: updatedAnswers }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to update reaction');
    }
  }

  function toggleEpisode(episodeId: string) {
    setActiveEpisodeId((current) => (current === episodeId ? null : episodeId));
    setExpandedQuestionId(null);
  }

  return (
    <>
      <Head>
        <title>Forum | Hour of Justice</title>
      </Head>

      <section className={styles.layout}>
        <div className={styles.toolbar}>
          <h1 className={styles.pageTitle}>EPISODES Q&amp;A</h1>
          <div className={styles.filterWrap}>
            <button
              type="button"
              className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${filter === 'answered' ? styles.filterButtonActive : ''}`}
              onClick={() => setFilter('answered')}
            >
              Answered
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${filter === 'unanswered' ? styles.filterButtonActive : ''}`}
              onClick={() => setFilter('unanswered')}
            >
              Unanswered
            </button>
          </div>
        </div>

        <div className={styles.episodesList}>
          {videos.map((video) => (
            <section key={video.id} className={styles.episodeSection}>
              <div className={styles.episodeTopRow}>
                <button
                  type="button"
                  className={`${styles.episodeItem} ${activeEpisodeId === video.id ? styles.episodeItemActive : ''}`}
                  onClick={() => toggleEpisode(video.id)}
                  aria-expanded={activeEpisodeId === video.id}
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={88}
                    height={54}
                    className={styles.episodeThumb}
                  />
                  <span className={styles.episodeTitle}>{video.title}</span>
                </button>
                <Link href={video.storyHref || '/'} className={styles.readMoreLink}>
                  READ MORE...
                </Link>
              </div>

              {activeEpisodeId === video.id ? (
                <>
                  <div className={styles.questionList}>
                    {(questionsByEpisode[video.id] || []).map((question) => {
                      const questionAnswers = answersByQuestion[question.id] || [];
                      const sortedQuestionAnswers = [...questionAnswers].sort(
                        (first, second) => toTimestamp(second.date) - toTimestamp(first.date)
                      );
                      const isExpanded = expandedQuestionId === question.id;
                      const canDeleteQuestion = !!user && user.id === question.user_id;

                      return (
                        <article key={question.id} className={styles.card}>
                          <div className={styles.questionHeader}>
                            <h3 className={styles.questionTitle}>{stripEpisodeTag(question.question_text)}</h3>
                            <span className={styles.answerCountBadge}>{question.answer_count} answers</span>
                          </div>
                          <div className={styles.meta}>
                            {question.user_name || 'Unknown'} • Asked {formatDateTime(question.date)}
                          </div>
                          <div className={styles.row}>
                            <button className={styles.button} onClick={() => toggleAnswers(question.id)} type="button">
                              {isExpanded ? 'Hide Answers' : 'View Answers'}
                            </button>
                            {canDeleteQuestion ? (
                              <button
                                className={`${styles.button} ${styles.buttonDanger}`}
                                onClick={() => handleDeleteQuestion(question.id)}
                                type="button"
                              >
                                Delete Question
                              </button>
                            ) : null}
                          </div>

                          {isExpanded ? (
                            <div className={styles.answers}>
                              {sortedQuestionAnswers.map((answer) => {
                                const canDeleteAnswer = !!user && user.id === answer.user_id;
                                const hasLiked = !!user && answer.likes.includes(user.id);
                                const hasDisliked = !!user && answer.dislikes.includes(user.id);

                                return (
                                  <div key={answer.id} className={styles.answer}>
                                    <div>{answer.answer_text}</div>
                                    <div className={styles.meta}>{answer.user_name || 'Unknown'} • Answered {formatDateTime(answer.date)}</div>
                                    <div className={styles.reactions}>
                                      <button
                                        className={`${styles.button} ${styles.reactionButton} ${hasLiked ? styles.reactionButtonActive : ''}`}
                                        type="button"
                                        onClick={() => handleReaction(question.id, answer.id, 'like')}
                                      >
                                        {hasLiked ? 'LIKED' : 'LIKE'} {answer.gained_likes_number}
                                      </button>
                                      <button
                                        className={`${styles.button} ${styles.reactionButton} ${hasDisliked ? styles.reactionButtonActive : ''}`}
                                        type="button"
                                        onClick={() => handleReaction(question.id, answer.id, 'dislike')}
                                      >
                                        {hasDisliked ? 'DISLIKED' : 'DISLIKE'} {answer.gained_dislikes_number}
                                      </button>
                                      {canDeleteAnswer ? (
                                        <button
                                          className={`${styles.button} ${styles.buttonDanger}`}
                                          type="button"
                                          onClick={() => handleDeleteAnswer(question.id, answer.id)}
                                        >
                                          Delete
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              })}

                              {sortedQuestionAnswers.length === 0 ? <div className={styles.answer}>No answers yet.</div> : null}

                              {user ? (
                                <form onSubmit={(event) => handleCreateAnswer(question.id, event)} className={styles.answer}>
                                  <textarea
                                    className={styles.textarea}
                                    rows={2}
                                    value={newAnswerByQuestion[question.id] || ''}
                                    onChange={(event) =>
                                      setNewAnswerByQuestion((prev) => ({
                                        ...prev,
                                        [question.id]: event.target.value
                                      }))
                                    }
                                    placeholder="Write your answer"
                                  />
                                  <div className={styles.row}>
                                    <button className={styles.button} type="submit">
                                      Reply
                                    </button>
                                  </div>
                                </form>
                              ) : null}
                            </div>
                          ) : null}
                        </article>
                      );
                    })}

                    {(questionsByEpisode[video.id] || []).length === 0 ? (
                      <div className={styles.card}>No questions yet for this episode.</div>
                    ) : null}
                  </div>

                  {user ? (
                    <form onSubmit={(event) => handleCreateQuestion(event, video.id)} className={styles.card}>
                      <h3>New Question</h3>
                      <textarea
                        className={`${styles.textarea} ${styles.questionTextarea}`}
                        rows={3}
                        value={newQuestionByEpisode[video.id] || ''}
                        onChange={(event) =>
                          setNewQuestionByEpisode((prev) => ({
                            ...prev,
                            [video.id]: event.target.value
                          }))
                        }
                        placeholder="Type your question"
                      />
                      <div className={styles.row}>
                        <button className={styles.button} type="submit" disabled={loading}>
                          {loading ? 'Posting...' : 'Post Question'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className={styles.card}>Sign in to post questions and react to answers.</div>
                  )}
                </>
              ) : null}
            </section>
          ))}
        </div>

        {error ? <div className={styles.card}>{error}</div> : null}
      </section>
    </>
  );
}
