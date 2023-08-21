import type { PartnershipContact } from '@prisma/client'

import {
  partnershipContacts,
  partnershipContact,
  createPartnershipContact,
  updatePartnershipContact,
  deletePartnershipContact,
} from './partnershipContacts'
import type { StandardScenario } from './partnershipContacts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('partnershipContacts', () => {
  scenario(
    'returns all partnershipContacts',
    async (scenario: StandardScenario) => {
      const result = await partnershipContacts()

      expect(result.length).toEqual(
        Object.keys(scenario.partnershipContact).length
      )
    }
  )

  scenario(
    'returns a single partnershipContact',
    async (scenario: StandardScenario) => {
      const result = await partnershipContact({
        id: scenario.partnershipContact.one.id,
      })

      expect(result).toEqual(scenario.partnershipContact.one)
    }
  )

  scenario(
    'creates a partnershipContact',
    async (scenario: StandardScenario) => {
      const result = await createPartnershipContact({
        input: { personId: scenario.partnershipContact.two.personId },
      })

      expect(result.personId).toEqual(scenario.partnershipContact.two.personId)
    }
  )

  scenario(
    'updates a partnershipContact',
    async (scenario: StandardScenario) => {
      const original = (await partnershipContact({
        id: scenario.partnershipContact.one.id,
      })) as PartnershipContact
      const result = await updatePartnershipContact({
        id: original.id,
        input: { personId: scenario.partnershipContact.two.personId },
      })

      expect(result.personId).toEqual(scenario.partnershipContact.two.personId)
    }
  )

  scenario(
    'deletes a partnershipContact',
    async (scenario: StandardScenario) => {
      const original = (await deletePartnershipContact({
        id: scenario.partnershipContact.one.id,
      })) as PartnershipContact
      const result = await partnershipContact({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
