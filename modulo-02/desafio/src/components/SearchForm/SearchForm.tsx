import { useState, type FormEvent } from 'react'
import styles from './SearchForm.module.css'

type SearchFormProps = {
  onSearch: (username: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [username, setUsername] = useState('')
  const normalizedUsername = username.trim()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (normalizedUsername) {
      onSearch(normalizedUsername)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="username">Usuário</label>
      <input
        id="username"
        className={styles.input}
        placeholder="Usuário"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button className={styles.button} type="submit" disabled={!normalizedUsername}>
        Entrar
      </button>
    </form>
  )
}
