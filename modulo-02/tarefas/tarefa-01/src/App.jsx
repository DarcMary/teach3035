import { useState } from 'react'
import './App.css'

function App() {
  const [contagem, setContagem] = useState(0)

  function handleClicar() {
    setContagem(contagem + 1)
  }

  function handleResetar() {
    setContagem(0)
  }

  return (
    <div className="container">
      <h1>Contador de Cliques</h1>

      <div className="contador">{contagem}</div>
      <p className="label-cliques">
        {contagem === 1 ? 'clique registrado' : 'cliques registrados'}
      </p>

      <button className="btn-clicar" onClick={handleClicar}>
        Clique aqui!
      </button>

      <button className="btn-resetar" onClick={handleResetar}>
        Resetar
      </button>
    </div>
  )
}

export default App
