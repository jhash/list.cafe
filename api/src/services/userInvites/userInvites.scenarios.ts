import type { Prisma, UserInvite } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserInviteCreateArgs>({
  userInvite: {
    one: {
      data: {
        user: {
          create: {
            email: 'String9679978',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String592669',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserInvite, 'userInvite'>
