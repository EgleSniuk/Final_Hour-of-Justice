import { AuthUser } from '../types/forum';

const TOKEN_KEY = 'hoj_token';
const USER_KEY = 'hoj_user';
const EXPIRES_AT_KEY = 'hoj_auth_expires_at';
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

function hasExpired(): boolean {
  if (typeof window === 'undefined') return true;

  const raw = localStorage.getItem(EXPIRES_AT_KEY);
  if (!raw) return true;

  const expiresAt = Number(raw);
  if (!Number.isFinite(expiresAt)) return true;

  return Date.now() >= expiresAt;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  if (hasExpired()) {
    clearAuth();
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  if (hasExpired()) {
    clearAuth();
    return null;
  }

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    clearAuth();
    return null;
  }
}

export function setAuth(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + SESSION_TTL_MS));
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}
