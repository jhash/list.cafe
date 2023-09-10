import { FindGroupQuery } from 'types/graphql'

// import GroupAvatar from '../GroupAvatar/GroupAvatar'

export interface ProfileProps {
  group?: FindGroupQuery['group']
}
export const GroupProfile = ({ group }: ProfileProps) => {
  if (!group) {
    return null
  }

  return (
    <div className="flex flex-grow flex-nowrap items-start gap-8">
      {/* <GroupAvatar group={group} /> */}
      <div className="flex flex-grow flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">{group.name}</span>
          {/* <span className="text-base text-gray-500">{group.pronouns}</span> */}
        </div>
        <div className="whitespace-pre leading-snug">{group.description}</div>
      </div>
    </div>
  )
}

export default GroupProfile
