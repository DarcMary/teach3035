import type { GitHubUser } from '../../types/github'

type ProfileHeaderProps = {
  user: GitHubUser
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user.name ?? user.login

  return (
    <header>
      <img src={user.avatar_url} alt={`Avatar for ${displayName}`} />
      <div>
        <h1>{displayName}</h1>
        <p>{user.bio ?? 'Bio not provided'}</p>
      </div>
    </header>
  )
}
