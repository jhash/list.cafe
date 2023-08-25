import type { Reservation } from '@prisma/client'

import {
  reservations,
  reservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from './reservations'
import type { StandardScenario } from './reservations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reservations', () => {
  scenario('returns all reservations', async (scenario: StandardScenario) => {
    const result = await reservations()

    expect(result.length).toEqual(Object.keys(scenario.reservation).length)
  })

  scenario(
    'returns a single reservation',
    async (scenario: StandardScenario) => {
      const result = await reservation({ id: scenario.reservation.one.id })

      expect(result).toEqual(scenario.reservation.one)
    }
  )

  scenario('creates a reservation', async (scenario: StandardScenario) => {
    const result = await createReservation({
      input: {
        listItemId: scenario.reservation.two.listItemId,
        userId: scenario.reservation.two.userId,
      },
    })

    expect(result.listItemId).toEqual(scenario.reservation.two.listItemId)
    expect(result.userId).toEqual(scenario.reservation.two.userId)
  })

  scenario('updates a reservation', async (scenario: StandardScenario) => {
    const original = (await reservation({
      id: scenario.reservation.one.id,
    })) as Reservation
    const result = await updateReservation({
      id: original.id,
      input: { listItemId: scenario.reservation.two.listItemId },
    })

    expect(result.listItemId).toEqual(scenario.reservation.two.listItemId)
  })

  scenario('deletes a reservation', async (scenario: StandardScenario) => {
    const original = (await deleteReservation({
      id: scenario.reservation.one.id,
    })) as Reservation
    const result = await reservation({ id: original.id })

    expect(result).toEqual(null)
  })
})
