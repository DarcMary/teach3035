import type { GitHubUser } from '../../types/github'
import styles from './ProfileHeader.module.css'

type ProfileHeaderProps = {
  user: GitHubUser
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user.name ?? user.login

  return (
    <header className={styles.header}>
      <img className={styles.avatar} src={user.avatar_url} alt={`Avatar for ${displayName}`} />
      <div>
        <p className={styles.label}>Informações do perfil</p>
        <h1 className={styles.name}>{displayName}</h1>
        <p className={styles.bio}>{user.bio ?? 'Biografia não informada'}</p>
      </div>
    </header>
  )
}
