import { ClipboardEventHandler, FormEvent, useEffect, useRef } from 'react'

import { MetaTags } from '@redwoodjs/web'

import RotatingText from 'src/components/RotatingText/RotatingText'

const HomePage = () => {
  const firstListItemRef = useRef<HTMLInputElement>(null)

  const onSubmit = (event?: FormEvent, text?: string) => {
    event?.preventDefault()
    event?.stopPropagation()

    const link = text || firstListItemRef.current.value

    if (!link?.trim()) {
      return
    }
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    onSubmit(undefined, event.clipboardData.getData('text'))
  }

  useEffect(() => {
    setImmediate(() => {
      firstListItemRef?.current.focus()
    })
  }, [])

  return (
    <>
      <MetaTags title="Home" description="List all of the things" />
      <div className="flex flex-grow select-none flex-col items-center justify-center">
        <div className="container flex max-w-3xl flex-col gap-12">
          {/* <div className="text-6xl">List all of the things</div> */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-normal font-serif text-5xl leading-tight">
            Share your
            <RotatingText>
              <span className="text-purple-700">Wishlist</span>
              <span className="text-orange-500">Gift Registry</span>
              <span className="text-lime-400">Top 10 List</span>
              <span className="text-yellow-500">Job List</span>
            </RotatingText>
            with the world
          </div>
          <form className="flex flex-grow flex-col" onSubmit={onSubmit}>
            <label htmlFor="list-item-1" className="label px-0 opacity-80">
              Paste a link here:
            </label>
            <input
              type="text"
              className="input input-ghost input-lg flex flex-grow rounded-none border-l-0 border-r-0 border-t-0 border-b-black px-0 outline-transparent focus:outline-transparent active:outline-transparent dark:border-b-white md:text-3xl"
              placeholder="Ex. astonmartin.com/models/vantage"
              ref={firstListItemRef}
              name="list-item-1"
              id="list-item-1"
              onPaste={onPaste}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default HomePage
