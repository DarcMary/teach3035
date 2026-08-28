type ErrorStateProps = {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return <main className={styles.page}><p className={styles.content} role="alert">{message}</p></main>
}
import styles from './ErrorState.module.css'
