import { Cog, Eye, User } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PageTitle from 'src/components/PageTitle/PageTitle'
import Profile from 'src/components/Profile/Profile'
import Tabs from 'src/components/Tabs/Tabs'

export const ProfileTabs = () => {
  return (
    <Tabs
      links={[
        {
          name: 'Preview',
          Icon: User,
          path: routes.profile(),
        },
        {
          name: 'Settings',
          Icon: Cog,
          path: routes.profileSettings(),
        },
      ]}
    />
  )
}

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <div className="flex w-full max-w-full flex-col gap-3">
        <PageTitle>
          <div className="flex-grow">{'Profile'}</div>
          {!!currentUser?.person?.identifier?.id && (
            <Link
              to={routes.identifier({
                identifier: currentUser?.person?.identifier?.id,
              })}
              className="btn btn-primary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
              title="Preview"
            >
              <Eye />
            </Link>
          )}
        </PageTitle>
        <ProfileTabs />
        <Profile person={currentUser.person} />
      </div>
      <ListFadeOut />
    </>
  )
}

export default ProfilePage
