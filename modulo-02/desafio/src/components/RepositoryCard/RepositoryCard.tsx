import type { GitHubRepository } from '../../types/github'

type RepositoryCardProps = {
  repository: GitHubRepository
  onSelect: (repository: GitHubRepository) => void
}

export function RepositoryCard({ repository, onSelect }: RepositoryCardProps) {
  return (
    <article>
      <button
        type="button"
        onClick={() => onSelect(repository)}
        aria-label={repository.name}
      >
        <h3>{repository.name}</h3>
        <p>{repository.description ?? 'Description not provided'}</p>
      </button>
    </article>
  )
}
