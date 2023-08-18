import { useEffect, useRef } from 'react'

import { MetaTags } from '@redwoodjs/web'

import RotatingText from 'src/components/RotatingText/RotatingText'

const HomePage = () => {
  const firstListItemRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setImmediate(() => {
      firstListItemRef?.current.focus()
    })
  }, [])

  return (
    <>
      <MetaTags title="Home" description="List all of the things" />
      <div className="flex flex-grow select-none flex-col items-center justify-center">
        <div className="container flex max-w-3xl flex-col gap-8">
          {/* <div className="text-6xl">List all of the things</div> */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-normal font-serif text-5xl leading-tight md:whitespace-nowrap">
            Share your
            <RotatingText>
              <div className="text-purple-700">Wishlist</div>
              <div className="text-orange-500">Gift Registry</div>
              <div className="text-lime-400">Top 10 List</div>
              <div className="text-amber-500">Job List</div>
            </RotatingText>
            with the world
          </div>
          <div className="flex flex-grow flex-col">
            <label htmlFor="list-item-1" className="label px-0 opacity-80">
              Paste a link here:
            </label>
            <input
              type="text"
              className="input input-accent input-lg flex flex-grow rounded-none border-l-0 border-r-0 border-t-0 px-0 outline-transparent focus:outline-transparent active:outline-transparent md:text-3xl"
              placeholder="Ex. astonmartin.com/models/vantage"
              ref={firstListItemRef}
              name="list-item-1"
              id="list-item-1"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
