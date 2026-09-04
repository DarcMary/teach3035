import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('movie selection', () => {
  it('shows an empty selection message initially', () => {
    render(<App />)
    expect(screen.getByText('Nenhum filme selecionado.')).toBeInTheDocument()
  })
  it('shows the selected movie name', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('checkbox', { name: 'Homem Aranha' }))
    expect(screen.getByRole('status')).toHaveTextContent('Homem Aranha')
  })
  it('shows every selected movie name', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('checkbox', { name: 'Homem Aranha' }))
    await user.click(screen.getByRole('checkbox', { name: 'Luther: O Cair da Noite' }))
    expect(screen.getByRole('status')).toHaveTextContent('Homem Aranha, Luther: O Cair da Noite')
  })
})
