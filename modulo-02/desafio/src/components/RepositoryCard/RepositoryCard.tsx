import type { GitHubRepository } from '../../types/github'
import styles from './RepositoryCard.module.css'

type RepositoryCardProps = {
  repository: GitHubRepository
  onSelect: (repository: GitHubRepository) => void
}

export function RepositoryCard({ repository, onSelect }: RepositoryCardProps) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        onClick={() => onSelect(repository)}
        aria-label={repository.name}
        className={styles.button}
      >
        <h3 className={styles.name}>{repository.name}</h3>
        <p className={styles.description}>{repository.description ?? 'Descrição não informada'}</p>
      </button>
    </article>
  )
}
