import { Redirect, routes } from '@redwoodjs/router'

import ListCell from 'src/components/ListCell'
import ListSettings from 'src/components/ListSettings/ListSettings'

interface ListSettingsPage {
  id?: number
}
const ListSettingsPage = ({ id }: ListSettingsPage) => {
  if (!id) {
    return <Redirect to={routes.lists()} />
  }
  return <ListCell id={id} dashboard Child={ListSettings} />
}

export default ListSettingsPage
