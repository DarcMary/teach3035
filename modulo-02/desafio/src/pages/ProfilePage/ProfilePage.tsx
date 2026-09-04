import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingState } from '../../components/LoadingState/LoadingState'
import { ProfileShell } from '../../components/ProfileShell/ProfileShell'
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader'
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { getGitHubProfile } from '../../services/githubApi'
import type { GitHubProfile, GitHubRepository } from '../../types/github'
import { RepositoryModal } from '../../components/RepositoryModal/RepositoryModal'
import styles from './ProfilePage.module.css'

type ProfileState =
  | { status: 'loading' }
  | { status: 'success'; profile: GitHubProfile }

export function ProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
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
          const message =
            error instanceof Error && error.message === 'User not found'
              ? 'Usuário não encontrado'
              : 'Não foi possível carregar o perfil. Tente novamente.'

          navigate('/', { replace: true, state: { errorMessage: message } })
        }
      }
    }

    void loadProfile()

    return () => {
      isCurrent = false
    }
  }, [navigate, username])

  if (state.status === 'loading') {
    return <LoadingState />
  }

  return (
    <ProfileShell>
      <div className={styles.content}>
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
    </ProfileShell>
  )
}
