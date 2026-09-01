import type { GitHubUser } from '../../types/github'
import styles from './ProfileHeader.module.css'

type ProfileHeaderProps = {
  user: GitHubUser
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user.name ?? user.login

  return (
    <section className={styles.section} aria-labelledby="profile-heading">
      <h1 id="profile-heading" className={styles.heading}>Informações do Perfil</h1>
      <div className={styles.profileCard}>
        <img className={styles.avatar} src={user.avatar_url} alt={`Avatar for ${displayName}`} />
        <div className={styles.details}>
          <p className={styles.label}>Nome</p>
          <h2 className={styles.name}>{displayName}</h2>
          <p className={styles.label}>Bio</p>
          <p className={styles.bio}>{user.bio ?? 'Biografia não informada'}</p>
        </div>
      </div>
    </section>
  )
}
