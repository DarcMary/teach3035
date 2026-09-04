/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { getGitHubProfile } from '../../services/githubApi'
import type { GitHubProfile } from '../../types/github'
import { SearchPage } from '../SearchPage/SearchPage'
import { ProfilePage } from './ProfilePage'

vi.mock('../../services/githubApi', () => ({
  getGitHubProfile: vi.fn(),
}))

const profile: GitHubProfile = {
  user: {
    login: 'octocat',
    avatar_url: 'https://example.com/avatar.png',
    name: 'The Octocat',
    bio: null,
  },
  repositories: [
    {
      id: 1,
      name: 'Hello-World',
      description: null,
      visibility: 'public',
      html_url: 'https://github.com/octocat/Hello-World',
      language: null,
    },
  ],
}

function renderProfilePage() {
  return render(
    <MemoryRouter initialEntries={['/profile/octocat']}>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.clearAllMocks()
})

it('shows loading while profile data is pending', () => {
  vi.mocked(getGitHubProfile).mockReturnValue(new Promise(() => {}))

  renderProfilePage()

  expect(screen.getByRole('banner')).toBeVisible()
  expect(screen.getByRole('status')).toHaveTextContent('Carregando...')
  expect(screen.getByRole('img', { name: 'Wtech' })).toBeVisible()
})

it('shows profile and repository data after loading', async () => {
  vi.mocked(getGitHubProfile).mockResolvedValue(profile)

  renderProfilePage()

  expect(await screen.findByRole('heading', { name: 'Informações do Perfil' })).toBeInTheDocument()
  expect(await screen.findByRole('heading', { name: 'The Octocat' })).toBeInTheDocument()
  expect(screen.getByAltText('Avatar for The Octocat')).toBeInTheDocument()
  expect(screen.getByText('Biografia não informada')).toBeInTheDocument()
  expect(screen.getByText('Hello-World')).toBeInTheDocument()
  expect(screen.getByText('Descrição não informada')).toBeInTheDocument()
})

it('keeps the desktop profile card aligned to the Figma content area', () => {
  const styles = readFileSync(
    resolve(process.cwd(), 'src/components/ProfileHeader/ProfileHeader.module.css'),
    'utf8',
  )

  expect(styles).toContain('width: min(635px, 100%)')
  expect(styles).toContain('height: 178px')
  expect(styles).toContain('border: 1px solid #E3E7EB')
  expect(styles).toContain('border-radius: 18px')
})

it('keeps the profile and repository sections on the same responsive content axis', () => {
  const styles = readFileSync(
    resolve(process.cwd(), 'src/components/RepositoryList/RepositoryList.module.css'),
    'utf8',
  )

  expect(styles).toContain('.headingRow { display: flex; align-items: center; justify-content: space-between; margin: 0 0 36px; }')
  expect(styles).toContain('.track { display: flex; width: max-content; gap: 38px; padding: 0 18px 8px; }')
})

it('returns to the search page with the account error banner when the user does not exist', async () => {
  vi.mocked(getGitHubProfile).mockRejectedValue(new Error('User not found'))

  renderProfilePage()

  expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeVisible()
  expect(await screen.findByRole('alert')).toHaveTextContent('Não conseguimos identificar sua conta.')
})

it('opens the selected repository in a modal', async () => {
  const user = userEvent.setup()
  vi.mocked(getGitHubProfile).mockResolvedValue(profile)

  renderProfilePage()

  await user.click(
    await screen.findByRole('button', { name: 'Hello-World' }),
  )

  expect(screen.getByRole('dialog', { name: 'Hello-World' })).toBeInTheDocument()
})
