import { afterEach, expect, it, vi } from 'vitest'
import { getGitHubProfile } from './githubApi'

const user = {
  login: 'octocat',
  avatar_url: 'https://example.com/avatar.png',
  name: 'The Octocat',
  bio: null,
}

const repositories = [
  {
    id: 1,
    name: 'Hello-World',
    description: null,
    visibility: 'public',
    html_url: 'https://github.com/octocat/Hello-World',
    language: null,
  },
]

afterEach(() => {
  vi.unstubAllGlobals()
})

it('returns user and repository data when both requests succeed', async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(new Response(JSON.stringify(user), { status: 200 }))
    .mockResolvedValueOnce(
      new Response(JSON.stringify(repositories), { status: 200 }),
    )

  vi.stubGlobal(
    'fetch',
    fetchMock,
  )

  await expect(getGitHubProfile('octocat')).resolves.toEqual({
    user,
    repositories,
  })
  expect(fetchMock).toHaveBeenNthCalledWith(
    1,
    'https://api.github.com/users/octocat',
  )
  expect(fetchMock).toHaveBeenNthCalledWith(
    2,
    'https://api.github.com/users/octocat/repos?per_page=100',
  )
})

it('throws a not found error when the user endpoint returns 404', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response('', { status: 404 })),
  )

  await expect(getGitHubProfile('missing-user')).rejects.toThrow(
    'User not found',
  )
})
