import './MovieTable.css'

export default function MovieTable({ movies }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th scope="col">Pôster</th>
            <th scope="col">Filme</th>
            <th scope="col">Gênero</th>
          </tr>
        </thead>
        <tbody>
          {movies.length ? movies.map((movie) => (
            <tr key={movie.id}>
              <td><img className="poster" src={movie.imagem} alt={`Pôster de ${movie.nome}`} /></td>
              <td>{movie.nome}</td>
              <td><span className="genre">{movie.genero}</span></td>
            </tr>
          )) : (
            <tr>
              <td className="empty-state" colSpan="3">Nenhum filme encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
