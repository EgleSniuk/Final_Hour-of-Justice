import { FormEvent, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { loginUser, registerUser } from '../../lib/api';
import { getToken, getUser, setAuth } from '../../lib/auth';
import styles from '../../styles/LoginPage.module.css';

type Mode = 'login' | 'register';

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

    if (!email.includes('@') || password.length < 6 || (mode === 'register' && name.trim().length < 2)) {
      setError('Check your input: valid email is required and password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        await registerUser({ name: name.trim(), email: email.trim(), password });
        setSuccess('Registration successful. You can now sign in.');
        setMode('login');
        setPassword('');
      } else {
        const response = await loginUser({ email: email.trim(), password });
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
            <input
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          )}
          <input
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
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
