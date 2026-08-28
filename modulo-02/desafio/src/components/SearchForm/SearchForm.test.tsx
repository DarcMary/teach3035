import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { SearchForm } from './SearchForm'

it('disables submit until a username is entered', () => {
  render(<SearchForm onSearch={vi.fn()} />)

  expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled()
})

it('trims the username before searching', async () => {
  const onSearch = vi.fn()
  const user = userEvent.setup()

  render(<SearchForm onSearch={onSearch} />)

  await user.type(screen.getByLabelText(/usuário do github/i), '  octocat  ')
  await user.click(screen.getByRole('button', { name: /buscar/i }))

  expect(onSearch).toHaveBeenCalledWith('octocat')
})
