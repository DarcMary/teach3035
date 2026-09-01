import { ProfileShell } from '../ProfileShell/ProfileShell'
import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <ProfileShell>
      <div className={styles.content} role="status">
        <span className={styles.loader} aria-hidden="true" />
        <p>Carregando...</p>
      </div>
    </ProfileShell>
  )
}
