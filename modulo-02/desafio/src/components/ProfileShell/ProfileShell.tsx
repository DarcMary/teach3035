import type { ReactNode } from 'react'
import { WtechLogo } from '../WtechLogo/WtechLogo'
import styles from './ProfileShell.module.css'

type ProfileShellProps = {
  children: ReactNode
}

export function ProfileShell({ children }: ProfileShellProps) {
  return (
    <main className={styles.page}>
      <header className={styles.banner}>
        <WtechLogo tone="dark" size="small" />
      </header>
      <section className={styles.surface}>{children}</section>
    </main>
  )
}
