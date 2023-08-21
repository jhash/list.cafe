import type { ListItem } from '@prisma/client'

import {
  listItems,
  listItem,
  createListItem,
  updateListItem,
  deleteListItem,
} from './listItems'
import type { StandardScenario } from './listItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('listItems', () => {
  scenario('returns all listItems', async (scenario: StandardScenario) => {
    const result = await listItems()

    expect(result.length).toEqual(Object.keys(scenario.listItem).length)
  })

  scenario('returns a single listItem', async (scenario: StandardScenario) => {
    const result = await listItem({ id: scenario.listItem.one.id })

    expect(result).toEqual(scenario.listItem.one)
  })

  scenario('creates a listItem', async (scenario: StandardScenario) => {
    const result = await createListItem({
      input: {
        title: 'String',
        description: 'String',
        url: 'String',
        listId: scenario.listItem.two.listId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.listId).toEqual(scenario.listItem.two.listId)
  })

  scenario('updates a listItem', async (scenario: StandardScenario) => {
    const original = (await listItem({
      id: scenario.listItem.one.id,
    })) as ListItem
    const result = await updateListItem({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a listItem', async (scenario: StandardScenario) => {
    const original = (await deleteListItem({
      id: scenario.listItem.one.id,
    })) as ListItem
    const result = await listItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
