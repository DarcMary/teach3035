import { Route, Routes } from 'react-router-dom'
import { SearchPage } from './pages/SearchPage/SearchPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
    </Routes>
  )
}
