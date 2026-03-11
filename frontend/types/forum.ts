export type QuestionItem = {
  id: string;
  question_text: string;
  date: string;
  user_id: string;
  user_name?: string;
  answer_count: number;
};

export type AnswerItem = {
  id: string;
  answer_text: string;
  date: string;
  question_id: string;
  user_id: string;
  user_name?: string;
  gained_likes_number: number;
  gained_dislikes_number: number;
  likes: string[];
  dislikes: string[];
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};
