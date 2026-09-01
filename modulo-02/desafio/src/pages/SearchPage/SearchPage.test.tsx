import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { SearchPage } from './SearchPage'

const navigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useNavigate: () => navigate,
}))

it('navigates to the profile route after a search', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>,
  )

  await user.type(screen.getByLabelText('Usuário'), 'octocat')
  await user.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(navigate).toHaveBeenCalledWith('/profile/octocat')
})

it('shows the login shell and error message passed through location state', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: { errorMessage: 'Usuário não encontrado' } }]}>
      <SearchPage />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Entrar' })).toBeVisible()
  expect(screen.getByRole('alert')).toHaveTextContent('Usuário não encontrado')
})
