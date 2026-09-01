import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { WtechLogo } from './WtechLogo'

it('renders the light Wtech logo artwork', () => {
  render(<WtechLogo tone="light" size="large" />)

  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute(
    'src',
    expect.stringContaining('wtech-logo-light'),
  )
})
