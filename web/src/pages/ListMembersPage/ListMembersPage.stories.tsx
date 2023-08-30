import type { Meta, StoryObj } from '@storybook/react'

import ListMembersPage from './ListMembersPage'

const meta: Meta<typeof ListMembersPage> = {
  component: ListMembersPage,
}

export default meta

type Story = StoryObj<typeof ListMembersPage>

export const Primary: Story = {}
