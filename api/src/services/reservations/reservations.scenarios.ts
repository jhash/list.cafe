import type { Prisma, Reservation } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ReservationCreateArgs>({
  reservation: {
    one: {
      data: {
        listItem: {
          create: { title: 'String', list: { create: { name: 'String' } } },
        },
        user: {
          create: {
            email: 'String7310886',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        listItem: {
          create: { title: 'String', list: { create: { name: 'String' } } },
        },
        user: {
          create: {
            email: 'String885176',
            person: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Reservation, 'reservation'>
