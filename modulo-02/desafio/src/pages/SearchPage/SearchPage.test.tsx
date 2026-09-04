/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>,
  )

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()

  await user.type(screen.getByLabelText('Usuário'), 'octocat')
  await user.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(navigate).toHaveBeenCalledWith('/profile/octocat')
})

it('shows the Figma account error banner above the username field', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: { errorMessage: 'Usuário não encontrado' } }]}>
      <SearchPage />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Entrar' })).toBeVisible()
  expect(screen.getByRole('alert')).toHaveTextContent('Ops!')
  expect(screen.getByRole('alert')).toHaveTextContent('Não conseguimos identificar sua conta.')
  expect(screen.getByLabelText('Usuário').compareDocumentPosition(screen.getByRole('alert'))).toBe(
    Node.DOCUMENT_POSITION_PRECEDING,
  )
  expect(navigate).toHaveBeenCalledWith('/', { replace: true, state: null })
})

it('closes the account error banner from its close button', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: { errorMessage: 'Usuário não encontrado' } }]}>
      <SearchPage />
    </MemoryRouter>,
  )

  await user.click(screen.getByRole('button', { name: 'Fechar aviso de erro' }))

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

it('keeps the responsive Figma geometry for the login panels and account error banner', () => {
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
  const lightLogo = readFileSync(
    resolve(process.cwd(), 'src/assets/wtech-logo-light.svg'),
    'utf8',
  )

  expect(logoStyles).toContain('width: min(357px, 100%)')
  expect(logoStyles).toContain('height: auto')
  expect(searchPageStyles).toContain('grid-template-columns: minmax(0, 1.6fr) minmax(347px, 1fr)')
  expect(searchPageStyles).toContain('width: min(347px, 100%)')
  expect(searchPageStyles).toContain('width: 100%; height: 84px;')
  expect(searchPageStyles).toContain('border-radius: 22px')
  expect(searchPageStyles).toContain('@media (max-width: 1000px)')
  expect(searchPageStyles).toContain('color: #303030')
  expect(searchPageStyles).toContain('text-align: center')
  expect(searchPageStyles).toContain('.errorCopy { display: grid; min-width: 0;')
  expect(searchPageStyles).toContain('white-space: normal')
  expect(searchPageStyles).toContain('overflow-wrap: anywhere')
  expect(searchFormStyles).toContain('width: 100%')
  expect(searchFormStyles).toContain('max-width: 347px')
  expect(searchFormStyles).toContain('font-weight: 400')
  expect(lightLogo).toContain('fill="#FFB629"')
})
