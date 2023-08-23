import { Coffee } from 'lucide-react'

import { Link } from '@redwoodjs/router'
const HomeLink = () => {
  return (
    <Link
      to="/"
      className="flex min-w-0 flex-grow basis-auto select-none flex-nowrap items-center gap-1.5 px-1.5 sm:gap-3 sm:px-3"
    >
      <h1 className="font-bricolageGrotesque text-2xl sm:text-3xl">
        list.cafe
      </h1>
      <Coffee className="flex-shrink-0" />
    </Link>
  )
}

export default HomeLink
