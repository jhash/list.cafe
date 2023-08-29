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
  { value: 'WEDDING', name: 'Wedding Registry', reservations: true },
  { value: 'BABY_SHOWER', name: 'Baby Shower', reservations: true },
  { value: 'SCHOOL', name: 'Back to School', reservations: true },
  { value: 'SHOPPING', name: 'Shopping', reservations: true },
  { value: 'GROCERIES', name: 'Groceries', reservations: true },
  {
    value: 'GIFTS',
    name: 'Gift Registry',
    description:
      'Gift registry of any kind. Maybe a birthday party? A quinceañera?',
    reservations: true,
  },
  {
    value: 'TOP',
    name: 'Top (n) List',
    description: "Ex. Top 10 flip phones that don't suck",
    badgeColor: 'badge-purple-400 bg-purple-400',
  },
  { value: 'FAVORITES', name: 'Favorites' },
  { value: 'JOBS', name: 'Jobs', disabled: true },
  { value: 'AWESOME', name: 'Awesome', disabled: true },
  { value: 'BOOKMARKS', name: 'Bookmarks', disabled: true },
  { value: 'FORUM', name: 'Forum', disabled: true },
  { value: 'INVENTORY', name: 'Inventory', disabled: true },
  { value: 'LINKTREE', name: 'Linktree', disabled: true },
  { value: 'SOCIAL', name: 'Social', disabled: true },
  { value: 'TABLE', name: 'Table', disabled: true },
  { value: 'TODO', name: 'To-do', disabled: true },
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
