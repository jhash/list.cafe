import type { Prisma, Image } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: {
      data: {
        url: 'String',
        height: 7507814.988291528,
        width: 6003734.183901472,
        format: 'String',
      },
    },
    two: {
      data: {
        url: 'String',
        height: 2027613.5650141058,
        width: 7920943.69130522,
        format: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Image, 'image'>
