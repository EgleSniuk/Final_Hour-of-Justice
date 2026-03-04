import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';
import {
  createAnswer,
  createQuestion,
  deleteAnswer,
  deleteQuestion,
  getAnswers,
  getQuestions,
  reactToAnswer
} from '../../lib/api';
import { clearAuth, getToken, getUser } from '../../lib/auth';
import { AnswerItem, QuestionItem } from '../../types/forum';
import styles from '../../styles/ForumPage.module.css';

type Filter = 'all' | 'answered' | 'unanswered';

export default function ForumPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, AnswerItem[]>>({});
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = getToken();
  const user = getUser();

  async function loadQuestions(currentFilter: Filter) {
    const data = await getQuestions(currentFilter);
    setQuestions(data);
  }

  useEffect(() => {
    setError('');
    loadQuestions(filter).catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko užkrauti klausimų');
    });
  }, [filter]);

  async function handleCreateQuestion(event: FormEvent) {
    event.preventDefault();
    if (!token) {
      setError('Turite būti prisijungę.');
      return;
    }
    if (newQuestion.trim().length < 10) {
      setError('Klausimas turi būti bent 10 simbolių.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await createQuestion(token, newQuestion.trim());
      setNewQuestion('');
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Klaida');
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
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko ištrinti klausimo');
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
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko užkrauti atsakymų');
    }
  }

  async function handleCreateAnswer(questionId: string, event: FormEvent) {
    event.preventDefault();
    if (!token) {
      setError('Turite būti prisijungę.');
      return;
    }
    if (newAnswer.trim().length < 2) {
      setError('Atsakymas turi būti bent 2 simbolių.');
      return;
    }

    try {
      await createAnswer(token, questionId, newAnswer.trim());
      setNewAnswer('');
      const updatedAnswers = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: updatedAnswers }));
      await loadQuestions(filter);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko pridėti atsakymo');
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
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko ištrinti atsakymo');
    }
  }

  async function handleReaction(questionId: string, answerId: string, type: 'like' | 'dislike') {
    if (!token) {
      setError('Turite būti prisijungę.');
      return;
    }

    try {
      await reactToAnswer(token, answerId, type);
      const updatedAnswers = await getAnswers(questionId);
      setAnswersByQuestion((prev) => ({ ...prev, [questionId]: updatedAnswers }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nepavyko pažymėti reakcijos');
    }
  }

  return (
    <>
      <Head>
        <title>Forumas | Hour of Justice</title>
      </Head>

      <section className={styles.layout}>
        <div className={styles.toolbar}>
          <h1>Klausimų Forumas</h1>
          <div className={styles.filterWrap}>
            <select className={styles.select} value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
              <option value="all">Visi</option>
              <option value="answered">Atsakyti</option>
              <option value="unanswered">Neatsakyti</option>
            </select>
            {user ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  clearAuth();
                  window.location.reload();
                }}
              >
                Atsijungti
              </button>
            ) : null}
          </div>
        </div>

        {user ? (
          <form onSubmit={handleCreateQuestion} className={styles.card}>
            <h3>Naujas klausimas</h3>
            <textarea
              className={styles.textarea}
              rows={3}
              value={newQuestion}
              onChange={(event) => setNewQuestion(event.target.value)}
              placeholder="Įveskite klausimą"
            />
            <div className={styles.row}>
              <button className={styles.button} type="submit" disabled={loading}>
                {loading ? 'Keliama...' : 'Užduoti klausimą'}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.card}>Prisijunkite, kad galėtumėte užduoti klausimus ir reaguoti į atsakymus.</div>
        )}

        {error ? <div className={styles.card}>{error}</div> : null}

        <div className={styles.questionList}>
          {questions.map((question) => {
            const questionAnswers = answersByQuestion[question.id] || [];
            const isExpanded = expandedQuestionId === question.id;
            const canDeleteQuestion = !!user && user.id === question.user_id;

            return (
              <article key={question.id} className={styles.card}>
                <strong>{question.question_text}</strong>
                <div className={styles.meta}>
                  Autorius: {question.user_name || 'Nežinomas'} • Atsakymų: {question.answer_count}
                </div>
                <div className={styles.row}>
                  <button className={styles.button} onClick={() => toggleAnswers(question.id)} type="button">
                    {isExpanded ? 'Slėpti atsakymus' : 'Peržiūrėti atsakymus'}
                  </button>
                  {canDeleteQuestion ? (
                    <button
                      className={`${styles.button} ${styles.buttonDanger}`}
                      onClick={() => handleDeleteQuestion(question.id)}
                      type="button"
                    >
                      Ištrinti klausimą
                    </button>
                  ) : null}
                </div>

                {isExpanded ? (
                  <div className={styles.answers}>
                    {user ? (
                      <form onSubmit={(event) => handleCreateAnswer(question.id, event)} className={styles.answer}>
                        <textarea
                          className={styles.textarea}
                          rows={2}
                          value={newAnswer}
                          onChange={(event) => setNewAnswer(event.target.value)}
                          placeholder="Parašykite atsakymą"
                        />
                        <div className={styles.row}>
                          <button className={styles.button} type="submit">
                            Atsakyti
                          </button>
                        </div>
                      </form>
                    ) : null}

                    {questionAnswers.map((answer) => {
                      const canDeleteAnswer = !!user && user.id === answer.user_id;
                      const hasLiked = !!user && answer.likes.includes(user.id);
                      const hasDisliked = !!user && answer.dislikes.includes(user.id);

                      return (
                        <div key={answer.id} className={styles.answer}>
                          <div>{answer.answer_text}</div>
                          <div className={styles.meta}>Autorius: {answer.user_name || 'Nežinomas'}</div>
                          <div className={styles.reactions}>
                            <button
                              className={styles.button}
                              type="button"
                              onClick={() => handleReaction(question.id, answer.id, 'like')}
                            >
                              {hasLiked ? '👍 Patinka' : '👍'} {answer.gained_likes_number}
                            </button>
                            <button
                              className={styles.button}
                              type="button"
                              onClick={() => handleReaction(question.id, answer.id, 'dislike')}
                            >
                              {hasDisliked ? '👎 Nepatinka' : '👎'} {answer.gained_dislikes_number}
                            </button>
                            {canDeleteAnswer ? (
                              <button
                                className={`${styles.button} ${styles.buttonDanger}`}
                                type="button"
                                onClick={() => handleDeleteAnswer(question.id, answer.id)}
                              >
                                Ištrinti
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}

                    {questionAnswers.length === 0 ? <div className={styles.answer}>Kol kas atsakymų nėra.</div> : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
