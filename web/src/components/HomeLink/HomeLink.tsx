import { Coffee } from 'lucide-react'

import { Link } from '@redwoodjs/router'
const HomeLink = () => {
  return (
    <Link
      to="/"
      className="flex flex-grow select-none flex-nowrap items-center gap-3"
    >
      <h1 className="font-bricolageGrotesque text-3xl">list.cafe</h1>
      <Coffee />
    </Link>
  )
}

export default HomeLink
