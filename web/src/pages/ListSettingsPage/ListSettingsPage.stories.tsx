import type { Meta, StoryObj } from '@storybook/react'

import ListSettingsPage from './ListSettingsPage'

const meta: Meta<typeof ListSettingsPage> = {
  component: ListSettingsPage,
}

export default meta

type Story = StoryObj<typeof ListSettingsPage>

export const Primary: Story = {}
