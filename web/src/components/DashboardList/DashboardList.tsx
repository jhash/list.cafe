import { useState } from 'react'

import { Pencil, Save } from 'lucide-react'
import { FindListQuery } from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import FormItem from '../FormItem/FormItem'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import PageTitle from '../PageTitle/PageTitle'
import SectionTitle from '../SectionTitle/SectionTitle'

const DashboardList: React.FC<FindListQuery> = ({ list }) => {
  // TODO: default to if user has edit access
  const [editing, setEditing] = useState<boolean>(true)
  const { id, name, description } = list

  const key = `list-${id}`

  return (
    <>
      <MetaTags title={name} description={description} />

      <PageTitle>{name}</PageTitle>
      <div className="flex flex-col gap-5">
        <button className="button" onClick={() => setEditing(!editing)}>
          {editing ? <Save /> : <Pencil />}
        </button>
        <Form className="flex flex-col gap-5">
          <FormItem
            name={`${key}-description`}
            defaultValue={description}
            editing={editing}
          >
            <SectionTitle>Description</SectionTitle>
          </FormItem>
        </Form>
        <div className="flex flex-col gap-3">
          <SectionTitle>Items</SectionTitle>
          <ul className="flex flex-col gap-2">
            <ListItemsCell listId={id} dashboard editing={editing} />
          </ul>
        </div>
      </div>
      <ListFadeOut />
    </>
  )
}

export default DashboardList
