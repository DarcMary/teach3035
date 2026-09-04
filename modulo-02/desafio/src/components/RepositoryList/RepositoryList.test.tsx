import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { GitHubRepository } from '../../types/github'
import { RepositoryList } from './RepositoryList'

const repositories: GitHubRepository[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Repository ${index + 1}`,
  description: index === 0 ? null : `Description ${index + 1}`,
  visibility: 'public',
  html_url: `https://github.com/octocat/repository-${index + 1}`,
  language: 'TypeScript',
}))

it('shows three repositories at a time and pages by three with bounded native controls', async () => {
  const user = userEvent.setup()
  render(<RepositoryList repositories={repositories} onSelect={vi.fn()} />)

  const previous = screen.getByRole('button', { name: 'Repositórios anteriores' })
  const next = screen.getByRole('button', { name: 'Próximos repositórios' })

  expect(screen.getByText('3 de 10')).toBeVisible()
  expect(previous).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Repository 1' })).toBeVisible()
  expect(screen.queryByRole('button', { name: 'Repository 4' })).not.toBeInTheDocument()

  await user.click(next)
  expect(screen.getByText('6 de 10')).toBeVisible()
  expect(screen.getByRole('button', { name: 'Repository 4' })).toBeVisible()

  await user.keyboard('{Enter}')
  expect(screen.getByText('9 de 10')).toBeVisible()

  await user.click(next)
  expect(screen.getByText('10 de 10')).toBeVisible()
  expect(next).toBeDisabled()
})

it('renders Link and Descrição blocks inside the card button without nested links', () => {
  render(<RepositoryList repositories={repositories.slice(0, 1)} onSelect={vi.fn()} />)

  const card = screen.getByRole('button', { name: 'Repository 1' })
  expect(screen.getByText('Link')).toBeVisible()
  expect(screen.getByText(repositories[0].html_url)).toBeVisible()
  expect(screen.getByText('Descrição')).toBeVisible()
  expect(screen.getByText('Descrição não informada')).toBeVisible()
  expect(card.querySelector('a')).toBeNull()
})
