import type { Prisma, ListMembership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListMembershipCreateArgs>({
  listMembership: {
    one: {
      data: {
        list: { create: { name: 'String' } },
        user: {
          create: {
            email: 'String9438173',
            hashedPassword: 'String',
            salt: 'String',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        list: { create: { name: 'String' } },
        user: {
          create: {
            email: 'String7619884',
            hashedPassword: 'String',
            salt: 'String',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ListMembership, 'listMembership'>
