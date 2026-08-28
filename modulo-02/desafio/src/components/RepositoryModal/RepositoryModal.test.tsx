import { render, screen } from '@testing-library/react'
import { useState } from 'react'
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
  expect(screen.getByText('Descrição não informada')).toBeInTheDocument()
  expect(screen.getByText('Linguagem não informada')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /abrir repositório/i })).toHaveAttribute(
    'href',
    repository.html_url,
  )
})

it('closes when the close button is clicked', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  render(<RepositoryModal repository={repository} onClose={onClose} />)

  await user.click(screen.getByRole('button', { name: /fechar/i }))

  expect(onClose).toHaveBeenCalledOnce()
})

it('closes when Escape is pressed', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  render(<RepositoryModal repository={repository} onClose={onClose} />)

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledOnce()
})

function ModalFixture() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open details
      </button>
      {isOpen && <RepositoryModal repository={repository} onClose={() => setIsOpen(false)} />}
    </>
  )
}

it('keeps focus in the dialog and restores it to the trigger on close', async () => {
  const user = userEvent.setup()
  render(<ModalFixture />)

  const trigger = screen.getByRole('button', { name: 'Open details' })
  await user.click(trigger)

  expect(screen.getByRole('button', { name: /fechar/i })).toHaveFocus()
  await user.tab()
  expect(screen.getByRole('link', { name: /abrir repositório/i })).toHaveFocus()
  await user.tab()
  expect(screen.getByRole('button', { name: /fechar/i })).toHaveFocus()

  await user.click(screen.getByRole('button', { name: /fechar/i }))
  expect(trigger).toHaveFocus()
})
