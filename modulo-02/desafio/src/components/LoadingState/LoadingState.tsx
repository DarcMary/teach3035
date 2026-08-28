import styles from './LoadingState.module.css'

export function LoadingState() {
  return <main className={styles.page}><p className={styles.content} role="status">Carregando...</p></main>
}
