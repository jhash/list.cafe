import { Image } from 'types/graphql'

import { CurrentUser } from 'src/auth'

interface ProfileProps {
  person?: Omit<CurrentUser['person'], 'addresses' | 'images'> & {
    images: Omit<Image, 'createdAt' | 'updatedAt'>[]
  }
}
export const Profile = ({ person }: ProfileProps) => {
  if (!person) {
    return null
  }

  return (
    <div className="flex flex-nowrap items-start gap-8">
      <div className="avatar flex-shrink-0 select-none">
        <div className="h-24 w-24 rounded-full bg-secondary">
          {person.images?.length ? (
            <img src={person.images?.[0]?.url || ''} alt={person.name} />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center text-4xl font-semibold tracking-wide text-black">
              {(person.name || '')
                .trim()
                .split(' ')
                .slice(0, 2)
                .map((name) => name[0])
                .join('')}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">{person.name}</span>
          <span className="text-base text-gray-500">{person.pronouns}</span>
        </div>
        <div className="leading-normal">{person.description}</div>
      </div>
    </div>
  )
}

export default Profile
