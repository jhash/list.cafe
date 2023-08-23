import type { ListGroupMembership } from '@prisma/client'

import {
  listGroupMemberships,
  listGroupMembership,
  createListGroupMembership,
  updateListGroupMembership,
  deleteListGroupMembership,
} from './listGroupMemberships'
import type { StandardScenario } from './listGroupMemberships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('listGroupMemberships', () => {
  scenario(
    'returns all listGroupMemberships',
    async (scenario: StandardScenario) => {
      const result = await listGroupMemberships()

      expect(result.length).toEqual(
        Object.keys(scenario.listGroupMembership).length
      )
    }
  )

  scenario(
    'returns a single listGroupMembership',
    async (scenario: StandardScenario) => {
      const result = await listGroupMembership({
        id: scenario.listGroupMembership.one.id,
      })

      expect(result).toEqual(scenario.listGroupMembership.one)
    }
  )

  scenario(
    'creates a listGroupMembership',
    async (scenario: StandardScenario) => {
      const result = await createListGroupMembership({
        input: {
          listId: scenario.listGroupMembership.two.listId,
          groupId: scenario.listGroupMembership.two.groupId,
        },
      })

      expect(result.listId).toEqual(scenario.listGroupMembership.two.listId)
      expect(result.groupId).toEqual(scenario.listGroupMembership.two.groupId)
    }
  )

  scenario(
    'updates a listGroupMembership',
    async (scenario: StandardScenario) => {
      const original = (await listGroupMembership({
        id: scenario.listGroupMembership.one.id,
      })) as ListGroupMembership
      const result = await updateListGroupMembership({
        id: original.id,
        input: { listId: scenario.listGroupMembership.two.listId },
      })

      expect(result.listId).toEqual(scenario.listGroupMembership.two.listId)
    }
  )

  scenario(
    'deletes a listGroupMembership',
    async (scenario: StandardScenario) => {
      const original = (await deleteListGroupMembership({
        id: scenario.listGroupMembership.one.id,
      })) as ListGroupMembership
      const result = await listGroupMembership({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
