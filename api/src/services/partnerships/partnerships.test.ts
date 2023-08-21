import type { Partnership } from '@prisma/client'

import {
  partnerships,
  partnership,
  createPartnership,
  updatePartnership,
  deletePartnership,
} from './partnerships'
import type { StandardScenario } from './partnerships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('partnerships', () => {
  scenario('returns all partnerships', async (scenario: StandardScenario) => {
    const result = await partnerships()

    expect(result.length).toEqual(Object.keys(scenario.partnership).length)
  })

  scenario(
    'returns a single partnership',
    async (scenario: StandardScenario) => {
      const result = await partnership({ id: scenario.partnership.one.id })

      expect(result).toEqual(scenario.partnership.one)
    }
  )

  scenario('creates a partnership', async () => {
    const result = await createPartnership({
      input: { name: 'String', url: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.url).toEqual('String')
  })

  scenario('updates a partnership', async (scenario: StandardScenario) => {
    const original = (await partnership({
      id: scenario.partnership.one.id,
    })) as Partnership
    const result = await updatePartnership({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a partnership', async (scenario: StandardScenario) => {
    const original = (await deletePartnership({
      id: scenario.partnership.one.id,
    })) as Partnership
    const result = await partnership({ id: original.id })

    expect(result).toEqual(null)
  })
})
