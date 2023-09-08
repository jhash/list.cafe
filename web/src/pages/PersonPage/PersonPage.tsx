import { MetaTags } from '@redwoodjs/web'

import PersonCell from 'src/components/PersonCell'
import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

interface PersonPageProps {
  id: number
}
const PersonPage = ({ id }: PersonPageProps) => {
  return (
    <>
      <MetaTags title="Person" description="Person page" />

      <HomeContainerLayout>
        <div className="flex min-h-[50vh] w-full max-w-full flex-grow flex-col">
          <PersonCell id={id} />
        </div>
      </HomeContainerLayout>
    </>
  )
}

export default PersonPage
