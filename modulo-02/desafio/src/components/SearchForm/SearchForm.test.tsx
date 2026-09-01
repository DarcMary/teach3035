import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { SearchForm } from './SearchForm'

it('disables submit until a username is entered', () => {
  render(<SearchForm onSearch={vi.fn()} />)

  expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled()
})

it('trims the username before searching', async () => {
  const onSearch = vi.fn()
  const user = userEvent.setup()

  render(<SearchForm onSearch={onSearch} />)

  await user.type(screen.getByLabelText('Usuário'), '  octocat  ')
  await user.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(onSearch).toHaveBeenCalledWith('octocat')
})
