import { useState } from 'react'
import type { GitHubRepository } from '../../types/github'
import { RepositoryCard } from '../RepositoryCard/RepositoryCard'
import previousArrow from '../../assets/repository-page-previous.svg'
import nextArrow from '../../assets/repository-page-next.svg'
import styles from './RepositoryList.module.css'

type RepositoryListProps = {
  repositories: GitHubRepository[]
  onSelect: (repository: GitHubRepository) => void
}

export function RepositoryList({ repositories, onSelect }: RepositoryListProps) {
  const pageSize = 3
  const [startIndex, setStartIndex] = useState(0)
  const endIndex = Math.min(startIndex + pageSize, repositories.length)
  const lastStartIndex = Math.max(0, Math.floor((repositories.length - 1) / pageSize) * pageSize)
  const visibleRepositories = repositories.slice(startIndex, endIndex)

  function movePage(direction: -1 | 1) {
    setStartIndex((currentIndex) =>
      Math.min(lastStartIndex, Math.max(0, currentIndex + direction * pageSize)),
    )
  }

  return (
    <section className={styles.section} aria-labelledby="repositories-heading">
      <div className={styles.headingRow}>
        <h2 id="repositories-heading">Repositórios</h2>
        <div className={styles.pagination}>
          <span aria-live="polite">{endIndex} de {repositories.length}</span>
          <button
            type="button"
            className={styles.pageButton}
            aria-label="Repositórios anteriores"
            disabled={startIndex === 0}
            onClick={() => movePage(-1)}
          >
            <img src={previousArrow} alt="" />
          </button>
          <button
            type="button"
            className={styles.pageButton}
            aria-label="Próximos repositórios"
            disabled={endIndex === repositories.length}
            onClick={() => movePage(1)}
          >
            <img className={styles.nextArrow} src={nextArrow} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track}>{visibleRepositories.map((repository) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
            onSelect={onSelect}
          />
        ))}</div>
      </div>
    </section>
  )
}
