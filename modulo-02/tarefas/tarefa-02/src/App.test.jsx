import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('movie catalogue', () => {
  it('displays every supplied movie initially', () => {
    render(<App />)

    expect(screen.getAllByRole('row')).toHaveLength(7)
    expect(screen.getByText('Homem Aranha')).toBeInTheDocument()
    expect(screen.getByText('Tudo em Todo o Lugar ao Mesmo Tempo')).toBeInTheDocument()
  })

  it('filters movies by genre without considering case', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('searchbox'), 'DRAMA')

    expect(screen.getByText('Luther: O Cair da Noite')).toBeInTheDocument()
    expect(screen.queryByText('Homem Aranha')).not.toBeInTheDocument()
  })

  it('shows an empty state when no movie matches', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('searchbox'), 'inexistente')

    expect(screen.getByText('Nenhum filme encontrado.')).toBeInTheDocument()
  })
})
