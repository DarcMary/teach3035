import { useLocation, useNavigate } from 'react-router-dom'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import { WtechLogo } from '../../components/WtechLogo/WtechLogo'
import styles from './SearchPage.module.css'

type SearchLocationState = {
  errorMessage?: string
}

export function SearchPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { errorMessage } = (location.state as SearchLocationState | null) ?? {}

  function handleSearch(username: string) {
    navigate(`/profile/${username}`)
  }

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Wtech">
        <WtechLogo tone="light" size="large" />
      </section>
      <section className={styles.searchPanel}>
        <div className={styles.searchContent}>
          <h1>Entrar</h1>
          {errorMessage && (
            <div className={styles.error} role="alert">
              <span className={styles.errorBadge} aria-hidden="true">×</span>
              <div className={styles.errorCopy}>
                <strong>Ops!</strong>
                <span>Não conseguimos identificar sua conta.</span>
              </div>
              <span className={styles.errorClose} aria-hidden="true">×</span>
            </div>
          )}
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
    </main>
  )
}
