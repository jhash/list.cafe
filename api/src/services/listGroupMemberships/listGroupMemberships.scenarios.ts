import type { Prisma, ListGroupMembership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListGroupMembershipCreateArgs>({
  listGroupMembership: {
    one: {
      data: {
        list: { create: { name: 'String' } },
        group: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        list: { create: { name: 'String' } },
        group: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  ListGroupMembership,
  'listGroupMembership'
>
