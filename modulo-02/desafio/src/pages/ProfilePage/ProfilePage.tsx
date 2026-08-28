import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorState } from '../../components/ErrorState/ErrorState'
import { LoadingState } from '../../components/LoadingState/LoadingState'
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader'
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { getGitHubProfile } from '../../services/githubApi'
import type { GitHubProfile, GitHubRepository } from '../../types/github'
import { RepositoryModal } from '../../components/RepositoryModal/RepositoryModal'
import styles from './ProfilePage.module.css'

type ProfileState =
  | { status: 'loading' }
  | { status: 'success'; profile: GitHubProfile }
  | { status: 'error'; message: string }

export function ProfilePage() {
  const { username } = useParams()
  const [state, setState] = useState<ProfileState>({ status: 'loading' })
  const [selectedRepository, setSelectedRepository] =
    useState<GitHubRepository | null>(null)

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
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.brand}>wtech</p>
        <ProfileHeader user={state.profile.user} />
      <RepositoryList
        repositories={state.profile.repositories}
        onSelect={setSelectedRepository}
      />
      <RepositoryModal
        repository={selectedRepository}
        onClose={() => setSelectedRepository(null)}
      />
      </div>
    </main>
  )
}
