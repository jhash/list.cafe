import type { ListMembership } from '@prisma/client'

import {
  listMemberships,
  listMembership,
  createListMembership,
  updateListMembership,
  deleteListMembership,
} from './listMemberships'
import type { StandardScenario } from './listMemberships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('listMemberships', () => {
  scenario(
    'returns all listMemberships',
    async (scenario: StandardScenario) => {
      const result = await listMemberships()

      expect(result.length).toEqual(Object.keys(scenario.listMembership).length)
    }
  )

  scenario(
    'returns a single listMembership',
    async (scenario: StandardScenario) => {
      const result = await listMembership({
        id: scenario.listMembership.one.id,
      })

      expect(result).toEqual(scenario.listMembership.one)
    }
  )

  scenario('creates a listMembership', async (scenario: StandardScenario) => {
    const result = await createListMembership({
      input: {
        listId: scenario.listMembership.two.listId,
        userId: scenario.listMembership.two.userId,
      },
    })

    expect(result.listId).toEqual(scenario.listMembership.two.listId)
    expect(result.userId).toEqual(scenario.listMembership.two.userId)
  })

  scenario('updates a listMembership', async (scenario: StandardScenario) => {
    const original = (await listMembership({
      id: scenario.listMembership.one.id,
    })) as ListMembership
    const result = await updateListMembership({
      id: original.id,
      input: { listId: scenario.listMembership.two.listId },
    })

    expect(result.listId).toEqual(scenario.listMembership.two.listId)
  })

  scenario('deletes a listMembership', async (scenario: StandardScenario) => {
    const original = (await deleteListMembership({
      id: scenario.listMembership.one.id,
    })) as ListMembership
    const result = await listMembership({ id: original.id })

    expect(result).toEqual(null)
  })
})
