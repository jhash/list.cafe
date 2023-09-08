import type { Meta, StoryObj } from '@storybook/react'

import PersonPage from './PersonPage'

const meta: Meta<typeof PersonPage> = {
  component: PersonPage,
}

export default meta

type Story = StoryObj<typeof PersonPage>

export const Primary: Story = {}
