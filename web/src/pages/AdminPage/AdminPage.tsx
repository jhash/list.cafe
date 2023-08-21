import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'

const AdminPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      <PageTitle>Admin</PageTitle>
    </>
  )
}

export default AdminPage
