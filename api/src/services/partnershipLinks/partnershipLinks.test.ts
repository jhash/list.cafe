import type { PartnershipLink } from '@prisma/client'

import {
  partnershipLinks,
  partnershipLink,
  createPartnershipLink,
  updatePartnershipLink,
  deletePartnershipLink,
} from './partnershipLinks'
import type { StandardScenario } from './partnershipLinks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('partnershipLinks', () => {
  scenario(
    'returns all partnershipLinks',
    async (scenario: StandardScenario) => {
      const result = await partnershipLinks()

      expect(result.length).toEqual(
        Object.keys(scenario.partnershipLink).length
      )
    }
  )

  scenario(
    'returns a single partnershipLink',
    async (scenario: StandardScenario) => {
      const result = await partnershipLink({
        id: scenario.partnershipLink.one.id,
      })

      expect(result).toEqual(scenario.partnershipLink.one)
    }
  )

  scenario('creates a partnershipLink', async () => {
    const result = await createPartnershipLink({
      input: { originalUrl: 'String' },
    })

    expect(result.originalUrl).toEqual('String')
  })

  scenario('updates a partnershipLink', async (scenario: StandardScenario) => {
    const original = (await partnershipLink({
      id: scenario.partnershipLink.one.id,
    })) as PartnershipLink
    const result = await updatePartnershipLink({
      id: original.id,
      input: { originalUrl: 'String2' },
    })

    expect(result.originalUrl).toEqual('String2')
  })

  scenario('deletes a partnershipLink', async (scenario: StandardScenario) => {
    const original = (await deletePartnershipLink({
      id: scenario.partnershipLink.one.id,
    })) as PartnershipLink
    const result = await partnershipLink({ id: original.id })

    expect(result).toEqual(null)
  })
})
