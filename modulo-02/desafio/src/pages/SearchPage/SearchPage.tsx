import { useState } from 'react'
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
  const [isErrorVisible, setIsErrorVisible] = useState(Boolean(errorMessage))

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
          {isErrorVisible && errorMessage && (
            <div className={styles.error} role="alert">
              <span className={styles.errorBadge} aria-hidden="true">×</span>
              <div className={styles.errorCopy}>
                <strong>Ops!</strong>
                <span>Não conseguimos identificar sua conta.</span>
              </div>
              <button
                className={styles.errorClose}
                type="button"
                aria-label="Fechar aviso de erro"
                onClick={() => setIsErrorVisible(false)}
              >
                ×
              </button>
            </div>
          )}
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
    </main>
  )
}
