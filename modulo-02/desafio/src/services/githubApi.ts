import type {
  GitHubProfile,
  GitHubRepository,
  GitHubUser,
} from '../types/github'

const API_BASE_URL = 'https://api.github.com/users'

async function parseResponse<T>(
  response: Response,
  errorMessage: string,
): Promise<T> {
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'User not found' : errorMessage)
  }

  return response.json() as Promise<T>
}

export async function getGitHubProfile(
  username: string,
): Promise<GitHubProfile> {
  const encodedUsername = encodeURIComponent(username)
  const [userResponse, repositoriesResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/${encodedUsername}`),
    fetch(`${API_BASE_URL}/${encodedUsername}/repos`),
  ])

  const [user, repositories] = await Promise.all([
    parseResponse<GitHubUser>(userResponse, 'Unable to load user data'),
    parseResponse<GitHubRepository[]>(
      repositoriesResponse,
      'Unable to load repositories',
    ),
  ])

  return { user, repositories }
}
