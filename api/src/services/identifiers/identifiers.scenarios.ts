import type { Prisma, Identifier } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.IdentifierCreateArgs>({
  identifier: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Identifier, 'identifier'>
