import { ThemeProvider,useTheme } from './context/ThemeContext'
import './App.css'
function ThemePage(){const {theme,toggleTheme}=useTheme();const dark=theme==='dark';return <main data-testid="page" data-theme={theme}><section><p className="eyebrow">PREFERÊNCIAS</p><h1>{dark?'Modo escuro':'Modo claro'}</h1><p>Use o botão para escolher o tema mais confortável para você.</p><button onClick={toggleTheme}>{dark?'Ativar modo claro':'Ativar modo escuro'}</button></section></main>}
export default function App(){return <ThemeProvider><ThemePage/></ThemeProvider>}
