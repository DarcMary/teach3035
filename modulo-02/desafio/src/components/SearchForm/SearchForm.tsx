import { useState, type FormEvent } from 'react'

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">GitHub username</label>
      <input
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit" disabled={!normalizedUsername}>
        Search
      </button>
    </form>
  )
}
