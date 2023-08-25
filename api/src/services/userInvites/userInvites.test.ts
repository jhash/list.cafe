import type { UserInvite } from '@prisma/client'

import {
  userInvites,
  userInvite,
  createUserInvite,
  updateUserInvite,
  deleteUserInvite,
} from './userInvites'
import type { StandardScenario } from './userInvites.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userInvites', () => {
  scenario('returns all userInvites', async (scenario: StandardScenario) => {
    const result = await userInvites()

    expect(result.length).toEqual(Object.keys(scenario.userInvite).length)
  })

  scenario(
    'returns a single userInvite',
    async (scenario: StandardScenario) => {
      const result = await userInvite({ id: scenario.userInvite.one.id })

      expect(result).toEqual(scenario.userInvite.one)
    }
  )

  scenario('creates a userInvite', async (scenario: StandardScenario) => {
    const result = await createUserInvite({
      input: { userId: scenario.userInvite.two.userId },
    })

    expect(result.userId).toEqual(scenario.userInvite.two.userId)
  })

  scenario('updates a userInvite', async (scenario: StandardScenario) => {
    const original = (await userInvite({
      id: scenario.userInvite.one.id,
    })) as UserInvite
    const result = await updateUserInvite({
      id: original.id,
      input: { userId: scenario.userInvite.two.userId },
    })

    expect(result.userId).toEqual(scenario.userInvite.two.userId)
  })

  scenario('deletes a userInvite', async (scenario: StandardScenario) => {
    const original = (await deleteUserInvite({
      id: scenario.userInvite.one.id,
    })) as UserInvite
    const result = await userInvite({ id: original.id })

    expect(result).toEqual(null)
  })
})
