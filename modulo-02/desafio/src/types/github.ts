export type GitHubUser = {
  login: string
  avatar_url: string
  name: string | null
  bio: string | null
}

export type GitHubRepository = {
  id: number
  name: string
  description: string | null
  visibility: 'public' | 'private'
  html_url: string
  language: string | null
}

export type GitHubProfile = {
  user: GitHubUser
  repositories: GitHubRepository[]
}
