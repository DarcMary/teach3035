import type { GitHubRepository } from '../../types/github'

type RepositoryCardProps = {
  repository: GitHubRepository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article>
      <h2>{repository.name}</h2>
      <p>{repository.description ?? 'Description not provided'}</p>
    </article>
  )
}
