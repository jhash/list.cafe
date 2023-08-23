import type { GroupMembership } from '@prisma/client'

import {
  groupMemberships,
  groupMembership,
  createGroupMembership,
  updateGroupMembership,
  deleteGroupMembership,
} from './groupMemberships'
import type { StandardScenario } from './groupMemberships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('groupMemberships', () => {
  scenario(
    'returns all groupMemberships',
    async (scenario: StandardScenario) => {
      const result = await groupMemberships()

      expect(result.length).toEqual(
        Object.keys(scenario.groupMembership).length
      )
    }
  )

  scenario(
    'returns a single groupMembership',
    async (scenario: StandardScenario) => {
      const result = await groupMembership({
        id: scenario.groupMembership.one.id,
      })

      expect(result).toEqual(scenario.groupMembership.one)
    }
  )

  scenario('creates a groupMembership', async (scenario: StandardScenario) => {
    const result = await createGroupMembership({
      input: {
        userId: scenario.groupMembership.two.userId,
        groupId: scenario.groupMembership.two.groupId,
      },
    })

    expect(result.userId).toEqual(scenario.groupMembership.two.userId)
    expect(result.groupId).toEqual(scenario.groupMembership.two.groupId)
  })

  scenario('updates a groupMembership', async (scenario: StandardScenario) => {
    const original = (await groupMembership({
      id: scenario.groupMembership.one.id,
    })) as GroupMembership
    const result = await updateGroupMembership({
      id: original.id,
      input: { userId: scenario.groupMembership.two.userId },
    })

    expect(result.userId).toEqual(scenario.groupMembership.two.userId)
  })

  scenario('deletes a groupMembership', async (scenario: StandardScenario) => {
    const original = (await deleteGroupMembership({
      id: scenario.groupMembership.one.id,
    })) as GroupMembership
    const result = await groupMembership({ id: original.id })

    expect(result).toEqual(null)
  })
})
