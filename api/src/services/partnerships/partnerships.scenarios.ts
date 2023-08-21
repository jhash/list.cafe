import type { Prisma, Partnership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PartnershipCreateArgs>({
  partnership: {
    one: { data: { name: 'String', url: 'String' } },
    two: { data: { name: 'String', url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Partnership, 'partnership'>
