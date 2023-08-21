import type { List } from '@prisma/client'

import { lists, list, createList, updateList, deleteList } from './lists'
import type { StandardScenario } from './lists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('lists', () => {
  scenario('returns all lists', async (scenario: StandardScenario) => {
    const result = await lists()

    expect(result.length).toEqual(Object.keys(scenario.list).length)
  })

  scenario('returns a single list', async (scenario: StandardScenario) => {
    const result = await list({ id: scenario.list.one.id })

    expect(result).toEqual(scenario.list.one)
  })

  scenario('creates a list', async () => {
    const result = await createList({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a list', async (scenario: StandardScenario) => {
    const original = (await list({ id: scenario.list.one.id })) as List
    const result = await updateList({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a list', async (scenario: StandardScenario) => {
    const original = (await deleteList({ id: scenario.list.one.id })) as List
    const result = await list({ id: original.id })

    expect(result).toEqual(null)
  })
})
