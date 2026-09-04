import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import lightLogoSource from '../../assets/wtech-logo-light.svg?raw'
import darkLogoSource from '../../assets/wtech-logo-dark.svg?raw'
import { WtechLogo } from './WtechLogo'

it('renders the light Wtech logo artwork', () => {
  render(<WtechLogo tone="light" size="large" />)

  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute(
    'src',
    expect.stringContaining('wtech-logo-light'),
  )
})

it('uses transparent composite Figma artwork for both logo variants', () => {
  for (const source of [lightLogoSource, darkLogoSource]) {
    expect(source).not.toContain('<rect')
    expect(source).toMatch(/#FC8621|#FFB629/)
  }
})

it('preserves each composite logo group dimensions', () => {
  const { rerender } = render(<WtechLogo tone="light" size="large" />)

  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute('width', '357')
  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute('height', '63')

  rerender(<WtechLogo tone="dark" size="small" />)

  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute('width', '153')
  expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute('height', '27')
})
