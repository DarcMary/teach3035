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
        <span className={styles.fields}>
          <span className={styles.field}>
            <span className={styles.label}>Link</span>
            <span className={styles.value}>{repository.html_url}</span>
          </span>
          <span className={styles.field}>
            <span className={styles.label}>Descrição</span>
            <span className={styles.value}>{repository.description ?? 'Descrição não informada'}</span>
          </span>
        </span>
      </button>
    </article>
  )
}
