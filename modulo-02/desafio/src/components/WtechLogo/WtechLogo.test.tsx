import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { WtechLogo } from './WtechLogo'

it('renders the Wtech wordmark with the requested color tone', () => {
  render(<WtechLogo tone="dark" />)

  expect(screen.getByLabelText('Wtech')).toHaveAttribute('data-tone', 'dark')
  expect(screen.getByText('wtech')).toBeInTheDocument()
})
