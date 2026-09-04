import { useMemo, useState } from 'react'
import MovieTable from './components/MovieTable'
import { movies } from './data/movies'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const visibleMovies = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('pt-BR')
    if (!search) return movies

    return movies.filter(({ nome, genero }) =>
      nome.toLocaleLowerCase('pt-BR').includes(search) ||
      genero.toLocaleLowerCase('pt-BR').includes(search),
    )
  }, [query])

  return (
    <main className="catalogue">
      <section className="catalogue-card" aria-labelledby="page-title">
        <p className="eyebrow">CINEMA EM CASA</p>
        <h1 id="page-title">Catálogo de filmes</h1>
        <p className="intro">Pesquise pelo título ou gênero para encontrar o que deseja assistir.</p>
        <label htmlFor="movie-search">Pesquisar filme</label>
        <input
          id="movie-search"
          type="search"
          placeholder="Ex.: drama ou Homem Aranha"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="result-count" aria-live="polite">
          {visibleMovies.length === 1 ? '1 filme localizado' : `${visibleMovies.length} filmes localizados`}
        </p>
        <MovieTable movies={visibleMovies} />
      </section>
    </main>
  )
}
