import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from './SearchPage'

const navigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useNavigate: () => navigate,
}))

it('navigates to the profile route after a search', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><SearchPage /></MemoryRouter>)

  await user.type(screen.getByLabelText('Usuário'), 'octocat')
  await user.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(navigate).toHaveBeenCalledWith('/profile/octocat')
})

it('shows the Figma login label and an in-shell error message', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: { errorMessage: 'Usuário não encontrado' } }]}>
      <SearchPage />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent('Usuário não encontrado')
})
