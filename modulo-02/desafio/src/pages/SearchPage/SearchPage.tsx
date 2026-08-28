import { useNavigate } from 'react-router-dom'
import { SearchForm } from '../../components/SearchForm/SearchForm'

export function SearchPage() {
  const navigate = useNavigate()

  function handleSearch(username: string) {
    navigate(`/profile/${username}`)
  }

  return (
    <main>
      <h1>GitHub Profile Search</h1>
      <SearchForm onSearch={handleSearch} />
    </main>
  )
}
