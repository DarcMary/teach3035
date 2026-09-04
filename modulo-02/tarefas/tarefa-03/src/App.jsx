import { useState } from 'react'
import MovieList from './components/MovieList'
import { movies as initialMovies } from './data/movies'
import './App.css'
export default function App() {
  const [movies, setMovies] = useState(initialMovies)
  const selected = movies.filter((movie) => movie.checked).map((movie) => movie.nome)
  const toggleMovie = (id) => setMovies((current) => current.map((movie) => movie.id === id ? { ...movie, checked: !movie.checked } : movie))
  return <main><section><p className="eyebrow">MINHA LISTA</p><h1>Selecione seus filmes</h1><p>Marque os filmes que deseja assistir.</p><MovieList movies={movies} onToggle={toggleMovie} /><div className="selection" role="status">{selected.length ? selected.join(', ') : 'Nenhum filme selecionado.'}</div></section></main>
}
