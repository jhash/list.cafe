import { HTMLProps } from 'react'

import classNames from 'classnames'

import { ProfileProps } from '../Profile/Profile'

type PersonAvatarProps = ProfileProps & HTMLProps<HTMLDivElement>
const PersonAvatar = ({ person, className }: PersonAvatarProps) => {
  if (!person) {
    return null
  }

  return (
    <div className="avatar flex-shrink-0 select-none">
      <div
        className={classNames(
          'rounded-full bg-secondary',
          className || 'h-24 w-24'
        )}
      >
        {person.images?.length ? (
          <img src={person.images?.[0]?.url || ''} alt={person.name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[2.25em] font-semibold tracking-wide text-black">
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
  )
}

export default PersonAvatar
