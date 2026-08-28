import type { GitHubRepository } from '../../types/github'
import { RepositoryCard } from '../RepositoryCard/RepositoryCard'
import styles from './RepositoryList.module.css'

type RepositoryListProps = {
  repositories: GitHubRepository[]
  onSelect: (repository: GitHubRepository) => void
}

export function RepositoryList({ repositories, onSelect }: RepositoryListProps) {
  return (
    <section className={styles.section} aria-labelledby="repositories-heading">
      <div className={styles.headingRow}>
      <h2 id="repositories-heading">Repositórios</h2>
        <span>{repositories.length}</span>
      </div>
      <div className={styles.grid}>{repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          onSelect={onSelect}
        />
      ))}</div>
    </section>
  )
}
