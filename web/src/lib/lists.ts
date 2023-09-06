import { ListType } from 'types/graphql'

export interface ListTypeOption {
  value: ListType
  name: string
  description?: string
  reservations?: boolean
  disabled?: boolean
  badgeColor?: string
}
export const LIST_TYPE_OPTIONS: ListTypeOption[] = [
  {
    value: 'WISHLIST',
    name: 'Wishlist',
    reservations: true,
    badgeColor: 'badge-primary',
  },
  {
    value: 'WEDDING',
    name: 'Wedding Registry',
    reservations: true,
    badgeColor: 'bg-pink-500 text-white',
  },
  {
    value: 'BABY_SHOWER',
    name: 'Baby Shower Registry',
    reservations: true,
    badgeColor: 'bg-purple-300 text-black',
  },
  {
    value: 'SCHOOL',
    name: 'Back to School',
    reservations: true,
    badgeColor: 'bg-teal-300 text-black',
  },
  {
    value: 'SHOPPING',
    name: 'Shopping',
    reservations: true,
    badgeColor: 'bg-emerald-300 text-black',
  },
  {
    value: 'GROCERIES',
    name: 'Groceries',
    reservations: true,
    badgeColor: 'bg-green-700 text-white',
  },
  {
    value: 'INFO',
    name: 'Information',
    badgeColor: 'bg-slate-700 text-white',
  },
  {
    value: 'GIFTS',
    name: 'Gift Registry',
    description:
      'Gift registry of any kind. Maybe a birthday party? A quinceañera?',
    reservations: true,
    badgeColor: 'bg-orange-300 text-black',
  },
  {
    value: 'TOP',
    name: 'Top (n) List',
    description: "Ex. Top 10 flip phones that don't suck",
    badgeColor: 'bg-purple-400 text-black',
  },
  {
    value: 'FAVORITES',
    name: 'Favorites',
    badgeColor: 'bg-purple-600 text-white',
  },
  { value: 'JOBS', name: 'Jobs', badgeColor: 'bg-lime-800 text-white' },
  { value: 'AWESOME', name: 'Awesome', badgeColor: 'bg-orange-400 text-black' },
  {
    value: 'BOOKMARKS',
    name: 'Bookmarks',
    badgeColor: 'bg-green-200 text-black',
  },
  {
    value: 'INVENTORY',
    name: 'Inventory',
    badgeColor: 'bg-amber-700 text-white',
  },
  { value: 'LINKTREE', name: 'Linktree', badgeColor: 'bg-lime-300 text-black' },
  { value: 'SOCIAL', name: 'Social', badgeColor: 'bg-blue-500 text-white' },
  { value: 'TODO', name: 'To-do', badgeColor: 'bg-amber-300 text-black' },
  { value: 'IDEAS', name: 'Ideas', badgeColor: 'badge-success' },
  // { value: 'FORUM', name: 'Forum', badgeColor: 'badge-primary' },
  // { value: 'TABLE', name: 'Table', badgeColor: 'badge-primary' },
]

export const matchListTypeOption = (value?: ListType) =>
  value ? LIST_TYPE_OPTIONS.find((option) => option.value === value) : undefined

export const reservationsEnabled = (value?: ListType) =>
  !!matchListTypeOption(value)?.reservations

export const LIST_VISIBILITY_OPTIONS = [
  {
    value: 'PRIVATE',
    name: 'Private',
    description: 'Only you and people you invite can access this list',
  },
  // TODO: delete this one?
  // { value: 'GROUP', name: 'Group' },
  {
    value: 'LINK',
    name: 'Link',
    description:
      'Anyone with the link can access this list. This list will not appear in public search results',
  },
  {
    value: 'PUBLIC',
    name: 'Public',
    description:
      'This list is accessible by the public and will show in search results',
  },
]
