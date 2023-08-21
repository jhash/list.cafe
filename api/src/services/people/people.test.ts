import type { Person } from '@prisma/client'

import {
  people,
  person,
  createPerson,
  updatePerson,
  deletePerson,
} from './people'
import type { StandardScenario } from './people.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('people', () => {
  scenario('returns all people', async (scenario: StandardScenario) => {
    const result = await people()

    expect(result.length).toEqual(Object.keys(scenario.person).length)
  })

  scenario('returns a single person', async (scenario: StandardScenario) => {
    const result = await person({ id: scenario.person.one.id })

    expect(result).toEqual(scenario.person.one)
  })

  scenario('creates a person', async () => {
    const result = await createPerson({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a person', async (scenario: StandardScenario) => {
    const original = (await person({ id: scenario.person.one.id })) as Person
    const result = await updatePerson({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a person', async (scenario: StandardScenario) => {
    const original = (await deletePerson({
      id: scenario.person.one.id,
    })) as Person
    const result = await person({ id: original.id })

    expect(result).toEqual(null)
  })
})
