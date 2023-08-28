import type { Identifier } from '@prisma/client'

import { identifiers, identifier, deleteIdentifier } from './identifiers'
import type { StandardScenario } from './identifiers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('identifiers', () => {
  scenario('returns all identifiers', async (scenario: StandardScenario) => {
    const result = await identifiers()

    expect(result.length).toEqual(Object.keys(scenario.identifier).length)
  })

  scenario(
    'returns a single identifier',
    async (scenario: StandardScenario) => {
      const result = await identifier({ id: scenario.identifier.one.id })

      expect(result).toEqual(scenario.identifier.one)
    }
  )

  scenario('deletes a identifier', async (scenario: StandardScenario) => {
    const original = (await deleteIdentifier({
      id: scenario.identifier.one.id,
    })) as Identifier
    const result = await identifier({ id: original.id })

    expect(result).toEqual(null)
  })
})
