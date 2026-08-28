import { Route, Routes } from 'react-router-dom'

function SearchPage() {
  return (
    <main>
      <h1>GitHub Profile Search</h1>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  )
}
