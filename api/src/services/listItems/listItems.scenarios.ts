import type { Prisma, ListItem } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemCreateArgs>({
  listItem: {
    one: {
      data: {
        title: 'String',
        description: 'String',
        url: 'String',
        list: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        title: 'String',
        description: 'String',
        url: 'String',
        list: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ListItem, 'listItem'>
