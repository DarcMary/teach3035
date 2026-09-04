import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe,expect,it } from 'vitest'
import App from './App'
describe('theme toggle',()=>{it('starts in light mode',()=>{render(<App/>);expect(screen.getByTestId('page')).toHaveAttribute('data-theme','light')});it('switches to dark mode',async()=>{const user=userEvent.setup();render(<App/>);await user.click(screen.getByRole('button',{name:'Ativar modo escuro'}));expect(screen.getByTestId('page')).toHaveAttribute('data-theme','dark');expect(screen.getByRole('button',{name:'Ativar modo claro'})).toBeInTheDocument()})})
