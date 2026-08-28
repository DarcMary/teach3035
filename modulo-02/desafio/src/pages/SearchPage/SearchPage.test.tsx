import { render, screen } from '@testing-library/react'
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
  render(<SearchPage />)

  await user.type(screen.getByLabelText(/github username/i), 'octocat')
  await user.click(screen.getByRole('button', { name: /search/i }))

  expect(navigate).toHaveBeenCalledWith('/profile/octocat')
})
