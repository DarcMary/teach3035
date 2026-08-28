import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorState } from '../../components/ErrorState/ErrorState'
import { LoadingState } from '../../components/LoadingState/LoadingState'
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader'
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { getGitHubProfile } from '../../services/githubApi'
import type { GitHubProfile } from '../../types/github'

type ProfileState =
  | { status: 'loading' }
  | { status: 'success'; profile: GitHubProfile }
  | { status: 'error'; message: string }

export function ProfilePage() {
  const { username } = useParams()
  const [state, setState] = useState<ProfileState>({ status: 'loading' })

  useEffect(() => {
    let isCurrent = true

    async function loadProfile() {
      setState({ status: 'loading' })

      try {
        const profile = await getGitHubProfile(username ?? '')

        if (isCurrent) {
          setState({ status: 'success', profile })
        }
      } catch (error) {
        if (isCurrent) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unable to load profile',
          })
        }
      }
    }

    void loadProfile()

    return () => {
      isCurrent = false
    }
  }, [username])

  if (state.status === 'loading') {
    return <LoadingState />
  }

  if (state.status === 'error') {
    return <ErrorState message={state.message} />
  }

  return (
    <main>
      <ProfileHeader user={state.profile.user} />
      <RepositoryList repositories={state.profile.repositories} />
    </main>
  )
}
