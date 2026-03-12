import { AnswerItem, LoginResponse, QuestionItem } from '../types/forum';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'DELETE';
  token?: string | null;
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });
  } catch {
    throw new Error(`Cannot reach API at ${API_BASE}. Check backend server and NEXT_PUBLIC_API_URL.`);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (data as { message?: string }).message || 'Request failed';
    throw new Error(message);
  }

  return data as T;
}

export function registerUser(payload: { name: string; email: string; password: string }) {
  return request<{ id: string; name: string; email: string }>('/register', {
    method: 'POST',
    body: payload
  });
}

export function loginUser(payload: { email: string; password: string }) {
  return request<LoginResponse>('/login', {
    method: 'POST',
    body: payload
  });
}

export function getQuestions(
  status: 'all' | 'answered' | 'unanswered' = 'all',
  topic: 'all' | 'General' | 'Investigation' | 'Evidence' | 'Courtroom' | 'Media' = 'all'
) {
  const params = new URLSearchParams();
  if (status !== 'all') {
    params.set('status', status);
  }
  if (topic !== 'all') {
    params.set('topic', topic);
  }

  const query = params.toString();
  return request<QuestionItem[]>(`/questions${query ? `?${query}` : ''}`);
}

export function createQuestion(
  token: string,
  question_text: string,
  topic: 'General' | 'Investigation' | 'Evidence' | 'Courtroom' | 'Media'
) {
  return request<QuestionItem>('/question', {
    method: 'POST',
    token,
    body: { question_text, topic }
  });
}

export function deleteQuestion(token: string, questionId: string) {
  return request<{ message: string }>(`/question/${questionId}`, {
    method: 'DELETE',
    token
  });
}

export function getAnswers(questionId: string) {
  return request<AnswerItem[]>(`/question/${questionId}/answers`);
}

export function createAnswer(token: string, questionId: string, answer_text: string) {
  return request<AnswerItem>(`/question/${questionId}/answers`, {
    method: 'POST',
    token,
    body: { answer_text }
  });
}

export function deleteAnswer(token: string, answerId: string) {
  return request<{ message: string }>(`/answer/${answerId}`, {
    method: 'DELETE',
    token
  });
}

export function reactToAnswer(token: string, answerId: string, type: 'like' | 'dislike') {
  return request<{ id: string; gained_likes_number: number; gained_dislikes_number: number }>(
    `/answer/${answerId}/reaction`,
    {
      method: 'POST',
      token,
      body: { type }
    }
  );
}
