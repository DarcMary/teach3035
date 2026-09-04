import { render,screen } from '@testing-library/react'
import { afterEach,describe,expect,it,vi } from 'vitest'
import App from './App'
afterEach(()=>vi.restoreAllMocks())
describe('pokemon cards',()=>{it('shows loading while requesting the API',()=>{vi.spyOn(global,'fetch').mockReturnValue(new Promise(()=>{}));render(<App/>);expect(screen.getByText('Carregando Pokémon...')).toBeInTheDocument()});it('shows names returned by the API',async()=>{vi.spyOn(global,'fetch').mockResolvedValue({ok:true,json:async()=>({results:[{name:'bulbasaur'},{name:'pikachu'}]})});render(<App/>);expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();expect(screen.getByText('Pikachu')).toBeInTheDocument()});it('shows a failure message',async()=>{vi.spyOn(global,'fetch').mockRejectedValue(new Error('offline'));render(<App/>);expect(await screen.findByText('Não foi possível carregar os Pokémon.')).toBeInTheDocument()})})
