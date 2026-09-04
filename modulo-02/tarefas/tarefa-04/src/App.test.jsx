import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
describe('to-do list', () => {
  it('adds a new task', async () => { const user=userEvent.setup(); render(<App />); await user.type(screen.getByLabelText('Nova tarefa'),'Estudar Context API'); await user.click(screen.getByRole('button',{name:'Adicionar'})); expect(screen.getByText('Estudar Context API')).toBeInTheDocument() })
  it('marks a task as completed', async () => { const user=userEvent.setup(); render(<App />); await user.type(screen.getByLabelText('Nova tarefa'),'Ler documentação'); await user.click(screen.getByRole('button',{name:'Adicionar'})); await user.click(screen.getByRole('checkbox',{name:'Ler documentação'})); expect(screen.getByText('Ler documentação')).toHaveClass('completed') })
  it('removes a task', async () => { const user=userEvent.setup(); render(<App />); await user.type(screen.getByLabelText('Nova tarefa'),'Remover depois'); await user.click(screen.getByRole('button',{name:'Adicionar'})); await user.click(screen.getByRole('button',{name:'Excluir Remover depois'})); expect(screen.queryByText('Remover depois')).not.toBeInTheDocument() })
})
