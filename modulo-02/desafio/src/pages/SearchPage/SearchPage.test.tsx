/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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

it('keeps the desktop geometry while constraining logo and form widths at 375px and 768px', () => {
  const logoStyles = readFileSync(
    resolve(process.cwd(), 'src/components/WtechLogo/WtechLogo.module.css'),
    'utf8',
  )
  const searchPageStyles = readFileSync(
    resolve(process.cwd(), 'src/pages/SearchPage/SearchPage.module.css'),
    'utf8',
  )
  const searchFormStyles = readFileSync(
    resolve(process.cwd(), 'src/components/SearchForm/SearchForm.module.css'),
    'utf8',
  )

  expect(logoStyles).toContain('width: min(357px, 100%)')
  expect(logoStyles).toContain('height: auto')
  expect(searchPageStyles).toContain('width: min(318px, 100%)')
  expect(searchFormStyles).toContain('width: 100%')
  expect(searchFormStyles).toContain('max-width: 318px')
})
