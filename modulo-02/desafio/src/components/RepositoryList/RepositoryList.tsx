import type { GitHubRepository } from '../../types/github'
import { RepositoryCard } from '../RepositoryCard/RepositoryCard'

type RepositoryListProps = {
  repositories: GitHubRepository[]
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <section aria-labelledby="repositories-heading">
      <h2 id="repositories-heading">Repositories</h2>
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </section>
  )
}
