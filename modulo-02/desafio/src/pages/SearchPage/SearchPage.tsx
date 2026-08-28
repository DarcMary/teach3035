import { useNavigate } from 'react-router-dom'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const navigate = useNavigate()

  function handleSearch(username: string) {
    navigate(`/profile/${username}`)
  }

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Wtech">
        <p className={styles.brand}>wtech</p>
      </section>
      <section className={styles.searchPanel}>
        <div className={styles.searchContent}>
          <p className={styles.eyebrow}>GitHub profile finder</p>
          <h1>GitHub Profile Search</h1>
          <p className={styles.description}>
            Enter a GitHub username to view profile information and repositories.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
    </main>
  )
}
