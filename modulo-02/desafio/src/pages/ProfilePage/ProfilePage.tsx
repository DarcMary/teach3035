import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingState } from '../../components/LoadingState/LoadingState'
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader'
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { getGitHubProfile } from '../../services/githubApi'
import type { GitHubProfile, GitHubRepository } from '../../types/github'
import { RepositoryModal } from '../../components/RepositoryModal/RepositoryModal'
import { ProfileShell } from '../../components/ProfileShell/ProfileShell'
import styles from './ProfilePage.module.css'

type ProfileState =
  | { status: 'loading' }
  | { status: 'success'; profile: GitHubProfile }
  | { status: 'error'; message: string }

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
          navigate('/', {
            replace: true,
            state: {
              errorMessage:
                error instanceof Error && error.message === 'User not found'
                  ? 'Usuário não encontrado'
                  : 'Não foi possível carregar o perfil. Tente novamente.',
            },
          })
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

  if (state.status === 'error') return null

  return (
    <ProfileShell>
      <section className={styles.content} aria-label="Conteúdo do perfil">
        <ProfileHeader user={state.profile.user} />
      <RepositoryList
        repositories={state.profile.repositories}
        onSelect={setSelectedRepository}
      />
      <RepositoryModal
        repository={selectedRepository}
        onClose={() => setSelectedRepository(null)}
      />
      </section>
    </ProfileShell>
  )
}
