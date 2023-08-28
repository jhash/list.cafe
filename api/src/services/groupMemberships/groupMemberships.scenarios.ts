import type { Prisma, GroupMembership } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GroupMembershipCreateArgs>({
  groupMembership: {
    one: {
      data: {
        user: {
          create: {
            email: 'String9717080',
            hashedPassword: 'String',
            salt: 'String',
            person: { create: { name: 'String' } },
          },
        },
        group: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String8067142',
            hashedPassword: 'String',
            salt: 'String',
            person: { create: { name: 'String' } },
          },
        },
        group: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<GroupMembership, 'groupMembership'>
