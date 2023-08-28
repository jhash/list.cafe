import type { Prisma, PartnershipLink } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PartnershipLinkCreateArgs>({
  partnershipLink: {
    one: { data: { originalUrl: 'String' } },
    two: { data: { originalUrl: 'String' } },
  },
})

export type StandardScenario = ScenarioData<PartnershipLink, 'partnershipLink'>
