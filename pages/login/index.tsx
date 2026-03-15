import { FormEvent, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { loginUser, registerUser } from '../../lib/api';
import { getToken, getUser, setAuth } from '../../lib/auth';
import styles from '../../styles/LoginPage.module.css';

type Mode = 'login' | 'register';

function hasAtLeastThreeLetters(value: string) {
  const letterMatches = value.match(/\p{L}/gu) ?? [];
  return letterMatches.length >= 3;
}

function isValidPassword(value: string) {
  return value.length >= 7 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (getToken() && getUser()) {
      router.replace('/forum');
    }
  }, [router]);

  const submitText = useMemo(() => (mode === 'login' ? 'Sign In' : 'Register'), [mode]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedEmail.includes('@')) {
      setError('Email must contain @.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 7 characters and include letters and at least one number.');
      return;
    }

    if (mode === 'register' && !hasAtLeastThreeLetters(trimmedName)) {
      setError('Name must contain at least 3 letters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        await registerUser({ name: trimmedName, email: trimmedEmail, password });
        setSuccess('Registration successful. You can now sign in.');
        setMode('login');
        setName('');
        setEmail(trimmedEmail);
        setPassword('');
      } else {
        const response = await loginUser({ email: trimmedEmail, password });
        setAuth(response.token, response.user);
        router.push('/forum');
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign In | Hour of Justice</title>
      </Head>
      <section className={styles.wrap}>
        <h1 className={styles.title}>Account</h1>
        <div className={styles.switcher}>
          <button
            type="button"
            className={`${styles.switchButton} ${mode === 'login' ? styles.switchButtonActive : ''}`}
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`${styles.switchButton} ${mode === 'register' ? styles.switchButtonActive : ''}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <input
                className={styles.input}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                minLength={3}
                required
              />
              <p className={styles.hint}>Name must contain at least 3 letters.</p>
            </>
          )}
          <input
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          {mode === 'register' && <p className={styles.hint}>Email must contain @.</p>}
          <input
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            minLength={7}
            required
          />
          {mode === 'register' && (
            <p className={styles.hint}>Password must be at least 7 characters and include letters and at least one number.</p>
          )}
          <button className={styles.submit} disabled={loading} type="submit">
            {loading ? 'Submitting...' : submitText}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </form>
      </section>
    </>
  );
}
