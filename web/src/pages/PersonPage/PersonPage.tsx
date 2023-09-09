import { Pencil, Share } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CopyListCafeLink from 'src/components/CopyListCafeLink/CopyListCafeLink'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PersonCell from 'src/components/PersonCell'
import Profile from 'src/components/Profile/Profile'
import PublicListsCell from 'src/components/PublicListsCell'
import SectionTitle from 'src/components/SectionTitle/SectionTitle'
import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

interface PersonPageProps {
  id: number
  identifier: string
}
const PersonPage = ({ id, identifier }: PersonPageProps) => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Person" description="Person page" />

      <HomeContainerLayout>
        <div className="flex min-h-[50vh] w-full max-w-full flex-grow flex-col gap-y-8">
          <div className="flex items-start gap-3">
            {currentUser?.person ? (
              <Profile person={currentUser?.person} />
            ) : (
              <PersonCell id={id} />
            )}
            {currentUser?.person?.id === id && (
              <Link
                className="btn btn-secondary ml-auto flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0"
                to={routes.profile()}
              >
                <Pencil size="1.25rem" />
              </Link>
            )}
            {!!identifier && (
              <CopyListCafeLink path={routes.identifier({ identifier })}>
                <div className="btn btn-secondary ml-auto flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0">
                  <Share size="1.25rem" />
                </div>
              </CopyListCafeLink>
            )}
          </div>
          <div className="flex w-full max-w-full flex-col gap-3">
            <SectionTitle>{'Lists'}</SectionTitle>
            <PublicListsCell personId={id} />
          </div>
          <ListFadeOut />
        </div>
      </HomeContainerLayout>
    </>
  )
}

export default PersonPage
