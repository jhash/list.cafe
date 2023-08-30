import {
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Heart, Wand2 } from 'lucide-react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { CreateListInput, CreateListItemInput } from 'types/graphql'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import Loading from 'src/components/Loading'
import RotatingText from 'src/components/RotatingText/RotatingText'
import { api } from 'src/lib/api'

export type DigestedItem = Omit<CreateListItemInput, 'listId'>
export type DigestedList = CreateListInput & {
  listItems: DigestedItem[]
  headerImage?: string
}

const httpsEverywhere = (text?: string) => {
  const url = (text || '').trim()

  if (url.match(/\s/g) || !url.match(/\./g)) {
    throw new Error('Not a url')
  }

  if (!url.match(/https?/g)) {
    return `https://${url}`
  }

  return url
}

const HomePage = () => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)
  const firstListItemRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event?: FormEvent, text?: string) => {
    event?.preventDefault()
    event?.stopPropagation()

    const prompt = text || firstListItemRef.current.value

    setDigestingLink(true)

    try {
      const url = httpsEverywhere(prompt)

      // This should fail if not valid
      const link = new URL(url)

      const { data } = await api.get('/digestLink', {
        params: {
          link,
        },
      })

      if (data) {
        window?.localStorage?.setItem('listDraft', JSON.stringify(data))
        navigate(routes.listDraft())
        return
      }
    } catch (error) {
      try {
        const { data } = await api.get('/digestPrompt', {
          params: {
            prompt,
          },
        })

        if (data) {
          window?.localStorage?.setItem('listDraft', JSON.stringify(data))
          navigate(routes.listDraft())
          return
        }
      } catch (error) {
        toast.error('We failed to create a list')
      }
    }

    setDigestingLink(false)
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    onSubmit(undefined, event.clipboardData.getData('text'))
  }

  useEffect(() => {
    setImmediate(() => {
      firstListItemRef?.current?.focus()
    })
  }, [])

  return (
    <>
      <MetaTags title="Home" description="List all of the things" />
      <BrowserOnly>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
          <ReactCanvasConfetti
            fire={digestingLink}
            height={window.innerHeight}
            width={window.innerWidth}
            className="sm:-translate-x-8"
          />
        </div>
      </BrowserOnly>
      <div className="flex flex-grow select-none flex-col items-center justify-center">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          {!digestingLink && (
            <>
              <div
                className="hidden flex-wrap items-center gap-x-6 whitespace-normal font-bricolageGrotesque text-8xl sm:whitespace-nowrap sm:text-9xl tall:flex"
                // style={{ textShadow: '3px 5px 5px rgb(0,0,0,0.2)' }}
              >
                We{' '}
                <Heart
                  // filter={'drop-shadow(3px 5px 5px rgb(0 0 0 / 0.2))'}
                  className="fill-purple-600"
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
            </>
          )}
          <form
            className="flex flex-grow select-text flex-col gap-7 p-1"
            onSubmit={onSubmit}
          >
            {digestingLink && <Loading />}
            <div className="flex flex-grow flex-col">
              {!digestingLink && (
                <label
                  htmlFor="list-item-1"
                  className="label px-1.5 font-medium opacity-90"
                >
                  <span className="label-text text-lg">
                    Ask a question, enter a prompt, or paste a link here:
                  </span>
                </label>
              )}
              <div className="relative flex animate-pulse items-center">
                <input
                  type="text"
                  className="input input-ghost input-lg flex flex-grow rounded-none border-l-0 border-r-0 border-t-0 border-b-gray-400 px-1.5 pr-12 outline-transparent focus:outline-transparent active:outline-transparent sm:text-3xl"
                  // TODO: run through a list of these
                  placeholder="Help me start my wedding registry"
                  ref={firstListItemRef}
                  name="list-item-1"
                  id="list-item-1"
                  onPaste={onPaste}
                  disabled={digestingLink}
                />
                <Wand2 className="pointer-events-none absolute right-3 animate-bounce text-gray-400" />
              </div>
            </div>
            <ListFadeOut />
          </form>
        </div>
      </div>
    </>
  )
}

export default HomePage
