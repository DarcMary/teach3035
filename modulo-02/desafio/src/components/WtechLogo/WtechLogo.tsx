import styles from './WtechLogo.module.css'

type WtechLogoProps = {
  tone: 'light' | 'dark'
}

export function WtechLogo({ tone }: WtechLogoProps) {
  return (
    <span aria-label="Wtech" className={styles.logo} data-tone={tone}>
      <span aria-hidden="true" className={styles.symbol}><i /><i /><i /></span>
      <strong>wtech</strong>
    </span>
  )
}
