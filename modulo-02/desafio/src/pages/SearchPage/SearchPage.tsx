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
          <p className={styles.eyebrow}>Buscador de perfis GitHub</p>
          <h1>Busca de perfil do GitHub</h1>
          <p className={styles.description}>
            Digite um usuário do GitHub para ver informações do perfil e repositórios.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
    </main>
  )
}
