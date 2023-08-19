import { ClipboardEventHandler, FormEvent, useEffect, useRef } from 'react'

import { Heart } from 'lucide-react'

import { MetaTags } from '@redwoodjs/web'

import RotatingText from 'src/components/RotatingText/RotatingText'

const HomePage = () => {
  const NUMBER_OF_LINES = 5

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
        <div className="flex max-w-2xl flex-col gap-8">
          <div
            className="hidden items-center gap-x-6 font-bricolageGrotesque text-9xl tall:flex"
            // style={{ textShadow: '3px 5px 5px rgb(0,0,0,0.2)' }}
          >
            We{' '}
            <Heart
              className="fill-purple-600"
              // filter={'drop-shadow(3px 5px 5px rgb(0 0 0 / 0.2))'}
              strokeOpacity={0.05}
              strokeWidth={0.75}
              size="6rem"
            />{' '}
            {/* <Heart className="fill-purple-700 stroke-purple-700" size="6rem" />{' '} */}
            Lists
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-normal font-serif text-5xl leading-tight">
            Share your
            <RotatingText>
              <span className="text-purple-600">Wishlist</span>
              <span className="text-orange-500">Gift Registry</span>
              <span className="text-lime-400">Top 10 List</span>
              <span className="text-yellow-500">Job List</span>
              <span className="text-pink-500">Favorites</span>
            </RotatingText>
            with the world
          </div>
          <form
            className="flex flex-grow flex-col gap-7 p-1"
            onSubmit={onSubmit}
          >
            <div className="flex flex-grow flex-col">
              <label
                htmlFor="list-item-1"
                className="label px-0.5 font-medium opacity-90"
              >
                <span className="label-text text-lg">Paste a link here:</span>
              </label>
              <input
                type="text"
                className="input input-ghost input-lg flex flex-grow rounded-none border-l-0 border-r-0 border-t-0 border-b-gray-400 px-0.5 outline-transparent focus:outline-transparent active:outline-transparent sm:text-3xl"
                placeholder="Ex. astonmartin.com/models/vantage"
                ref={firstListItemRef}
                name="list-item-1"
                id="list-item-1"
                onPaste={onPaste}
              />
            </div>
            <div className="flex max-h-0 flex-col overflow-visible">
              <div className="flex flex-col gap-6">
                {[...Array(NUMBER_OF_LINES).keys()].map((value) => (
                  <div
                    key={value}
                    className="h-1.5 rounded bg-gray-400"
                    style={{
                      opacity:
                        ((NUMBER_OF_LINES - value) / NUMBER_OF_LINES) * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default HomePage
