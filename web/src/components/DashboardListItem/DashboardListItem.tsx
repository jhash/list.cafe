import { useState } from 'react'

import { ListItemsQuery } from 'types/graphql'

import { Form } from '@redwoodjs/forms'

import FormInput from '../FormInput/FormInput'
import FormLabel from '../FormLabel/FormLabel'

type DashboardListItemProps = ListItemsQuery['listItems'][number] & {
  editing: boolean
}
const DashboardListItem: React.FC<DashboardListItemProps> = ({
  id,
  title,
  description,
  editing = false,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const key = `list-item-${id}`

  return (
    <div className="collapse-arrow collapse flex-grow rounded-lg border shadow-sm">
      <input
        type="radio"
        name={key}
        checked={open}
        onClick={() => setOpen(!open)}
        // className="h-12"
      />
      <div className="collapse-title flex flex-grow flex-nowrap text-lg">
        {title}
      </div>
      <Form
        className="collapse-content flex flex-shrink-0 flex-nowrap"
        name={`${key}-form`}
      >
        <div className="flex flex-grow flex-col gap-1">
          <FormLabel
            className="text-base"
            htmlFor={`${key}-description`}
            name={`${key}-description-label`}
          >
            Description
          </FormLabel>
          {editing ? (
            <FormInput type="text" name={`${key}-description`} />
          ) : (
            <p className="font-sans">{description}</p>
          )}
        </div>
      </Form>
    </div>
  )
}

export default DashboardListItem
