import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String797375',
        hashedPassword: 'String',
        salt: 'String',
        person: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        email: 'String6243676',
        hashedPassword: 'String',
        salt: 'String',
        person: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
