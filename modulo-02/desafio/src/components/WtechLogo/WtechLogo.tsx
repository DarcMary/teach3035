import lightLogo from '../../assets/wtech-logo-light.svg'
import darkLogo from '../../assets/wtech-logo-dark.svg'
import styles from './WtechLogo.module.css'

type WtechLogoProps = {
  tone: 'light' | 'dark'
  size: 'large' | 'small'
}

export function WtechLogo({ tone, size }: WtechLogoProps) {
  const dimensions = size === 'large' ? { width: 357, height: 63 } : { width: 153, height: 27 }

  return (
    <img
      className={styles[size]}
      src={tone === 'light' ? lightLogo : darkLogo}
      alt="Wtech"
      {...dimensions}
    />
  )
}
