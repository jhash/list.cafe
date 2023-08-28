import type { Prisma, PartnershipContact } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PartnershipContactCreateArgs>({
  partnershipContact: {
    one: { data: { person: { create: { name: 'String' } } } },
    two: { data: { person: { create: { name: 'String' } } } },
  },
})

export type StandardScenario = ScenarioData<
  PartnershipContact,
  'partnershipContact'
>
