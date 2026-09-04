/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { LoadingState } from './LoadingState'

it('renders the loading state in the Figma split shell', () => {
  render(<LoadingState />)

  expect(screen.getByRole('img', { name: 'Wtech' })).toBeVisible()
  expect(screen.getByRole('status')).toHaveTextContent('Carregando...')

  const styles = readFileSync(
    resolve(process.cwd(), 'src/components/LoadingState/LoadingState.module.css'),
    'utf8',
  )

  expect(styles).toContain('grid-template-columns: 1fr 1fr')
  expect(styles).toContain('background: var(--color-brand)')
  expect(styles).toContain('grid-template-columns: 1fr')
})
