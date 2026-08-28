import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { GitHubRepository } from '../../types/github'
import { RepositoryModal } from './RepositoryModal'

const repository: GitHubRepository = {
  id: 1,
  name: 'Hello-World',
  description: null,
  visibility: 'public',
  html_url: 'https://github.com/octocat/Hello-World',
  language: null,
}

it('shows repository details and fallback values', () => {
  render(<RepositoryModal repository={repository} onClose={vi.fn()} />)

  expect(screen.getByRole('dialog', { name: 'Hello-World' })).toBeInTheDocument()
  expect(screen.getByText('public')).toBeInTheDocument()
  expect(screen.getByText('Description not provided')).toBeInTheDocument()
  expect(screen.getByText('Language not provided')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /open repository/i })).toHaveAttribute(
    'href',
    repository.html_url,
  )
})

it('closes when the close button is clicked', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  render(<RepositoryModal repository={repository} onClose={onClose} />)

  await user.click(screen.getByRole('button', { name: /close/i }))

  expect(onClose).toHaveBeenCalledOnce()
})

it('closes when Escape is pressed', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  render(<RepositoryModal repository={repository} onClose={onClose} />)

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledOnce()
})
