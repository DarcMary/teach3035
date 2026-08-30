import styles from './LoadingState.module.css'
import { ProfileShell } from '../ProfileShell/ProfileShell'

export function LoadingState() {
  return <ProfileShell><section className={styles.content} role="status"><span aria-hidden="true" className={styles.spinner} />Carregando...</section></ProfileShell>
}
