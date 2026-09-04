import { WtechLogo } from '../WtechLogo/WtechLogo'
import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <main className={styles.page}>
      <header className={styles.brandPanel} aria-label="Wtech">
        <WtechLogo tone="light" size="large" />
      </header>
      <section className={styles.loadingPanel} role="status">
        <div className={styles.content}>
          <span className={styles.loader} aria-hidden="true" />
          <p>Carregando...</p>
        </div>
      </section>
    </main>
  )
}
