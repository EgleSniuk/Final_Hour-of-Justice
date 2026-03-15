import styles from './styles.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export default function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  const wrapperClassName = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  return (
    <div className={wrapperClassName} role="status" aria-live="polite" aria-label={label}>
      <span className={`${styles.spinner} ${styles[size]}`} />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}
