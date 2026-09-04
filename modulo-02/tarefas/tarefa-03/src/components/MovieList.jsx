export default function MovieList({ movies, onToggle }) {
  return <ul>{movies.map((movie) => <li key={movie.id}><label><input type="checkbox" checked={movie.checked} onChange={() => onToggle(movie.id)} /> {movie.nome}</label></li>)}</ul>
}
