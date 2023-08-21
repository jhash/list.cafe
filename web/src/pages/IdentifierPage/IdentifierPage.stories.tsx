import type { Meta, StoryObj } from '@storybook/react'

import IdentifierPage from './IdentifierPage'

const meta: Meta<typeof IdentifierPage> = {
  component: IdentifierPage,
}

export default meta

type Story = StoryObj<typeof IdentifierPage>

export const Primary: Story = {}
