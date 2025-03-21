import { describe, expect, test } from 'vitest'

import { fireEvent, render, screen } from '@testing-library/react'
import DeletedMessage from '../components/ui/DeletedMessage'
import { beforeEach } from 'node:test'

beforeEach(() => {
  render(<DeletedMessage message="This is a test message" />)
})

describe('RegisterForm', () => {
  test('should renders the component', async () => {
    expect(screen.queryByText(/message/i)).toBeDefined()
  })

  test('should disappear after 5 seconds', async () => {
    expect(screen.queryByText(/message/i)).toBeNull()
  }, 4001)
})
