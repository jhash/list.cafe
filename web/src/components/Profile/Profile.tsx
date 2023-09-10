import { Image } from 'types/graphql'

import { CurrentUser } from 'src/auth'

import PersonAvatar from '../PersonAvatar/PersonAvatar'

export interface ProfileProps {
  person?: Omit<
    CurrentUser['person'],
    'addresses' | 'images' | 'createdAt' | 'updatedAt' | 'id'
  > & {
    images: Omit<Image, 'createdAt' | 'updatedAt'>[]
    id?: number
  }
}
export const Profile = ({ person }: ProfileProps) => {
  if (!person) {
    return null
  }

  return (
    <div className="flex flex-grow flex-nowrap items-start gap-8">
      <PersonAvatar person={person} />
      <div className="flex flex-grow flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">{person.name}</span>
          <span className="text-base text-gray-500">{person.pronouns}</span>
        </div>
        <div className="whitespace-pre leading-snug">{person.description}</div>
      </div>
    </div>
  )
}

export default Profile
