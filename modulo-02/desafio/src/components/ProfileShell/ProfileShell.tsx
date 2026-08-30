import type { PropsWithChildren } from 'react'
import { WtechLogo } from '../WtechLogo/WtechLogo'
import styles from './ProfileShell.module.css'

export function ProfileShell({ children }: PropsWithChildren) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <WtechLogo tone="dark" />
      </header>
      {children}
    </main>
  )
}
