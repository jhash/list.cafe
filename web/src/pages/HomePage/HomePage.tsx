import {
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Heart } from 'lucide-react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { CreateListInput, CreateListItemInput } from 'types/graphql'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import ExternalLink from 'src/components/ExternalLink/ExternalLink'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import Loading from 'src/components/Loading'
import RotatingText from 'src/components/RotatingText/RotatingText'
import SectionTitle from 'src/components/SectionTitle/SectionTitle'
import { api } from 'src/lib/api'
import { matchListTypeOption } from 'src/lib/lists'

export type DigestedItem = Omit<CreateListItemInput, 'listId'>
export type DigestedList = CreateListInput & {
  listItems: DigestedItem[]
  headerImage?: string
}

const httpsEverywhere = (text?: string) => {
  const url = (text || '').trim()

  if (url.match(/\s/g)) {
    return url
  }

  if (!url.match(/https?/g)) {
    return `https://${url}`
  }

  return url
}

const HomePage = () => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)
  const [digestedList, setDigestedList] = useState<DigestedList | undefined>()
  const firstListItemRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event?: FormEvent, text?: string) => {
    event?.preventDefault()
    event?.stopPropagation()

    const prompt = text || firstListItemRef.current.value

    const url = httpsEverywhere(prompt)

    setDigestingLink(true)

    try {
      // This should fail if not valid
      const link = new URL(url)

      const { data } = await api.get('/digestLink', {
        params: {
          link,
        },
      })

      if (data) {
        setDigestedList(data)
      }
    } catch (error) {
      try {
        const { data } = await api.get('/digestPrompt', {
          params: {
            prompt,
          },
        })

        if (data) {
          setDigestedList(data)
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
          <div
            className="hidden flex-wrap items-center gap-x-6 whitespace-normal font-bricolageGrotesque text-9xl sm:whitespace-nowrap tall:flex"
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
          <form
            className="flex flex-grow flex-col gap-7 p-1"
            onSubmit={onSubmit}
          >
            {digestingLink ? (
              <Loading />
            ) : digestedList ? (
              <div className="flex flex-col gap-y-3">
                {!!digestedList.name && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Name</SectionTitle>
                    {digestedList.name}
                  </div>
                )}
                {!!digestedList.description && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Description</SectionTitle>
                    {digestedList.description}
                  </div>
                )}
                {!!digestedList.type && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Type</SectionTitle>
                    {matchListTypeOption(digestedList.type)?.name ||
                      digestedList.type}
                  </div>
                )}
                {!!digestedList.headerImage && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Image</SectionTitle>
                    <img
                      style={{ maxWidth: 150 }}
                      src={digestedList.headerImage}
                      alt={digestedList.name}
                    />
                  </div>
                )}
                {!!digestedList.listItems?.length && (
                  <div className="flex flex-col gap-y-3 divide-y">
                    <SectionTitle>Items</SectionTitle>
                    {digestedList.listItems.map(
                      ({ url, title, description, images }, index) => {
                        const inner = (
                          <>
                            {!!title && (
                              <div className="flex flex-col gap-y-2">
                                <SectionTitle>Title</SectionTitle>
                                {title}
                              </div>
                            )}
                            {!!description && (
                              <div className="flex flex-col gap-y-2">
                                <SectionTitle>Description</SectionTitle>
                                {description}
                              </div>
                            )}
                            {!!images?.length && (
                              <div
                                className="flex flex-col gap-y-2"
                                style={{ maxWidth: 150 }}
                              >
                                <SectionTitle>Images</SectionTitle>
                                {images?.map(({ url, alt }, index) => (
                                  <img key={index} src={url} alt={alt} />
                                ))}
                              </div>
                            )}
                          </>
                        )
                        return url ? (
                          <ExternalLink
                            href={httpsEverywhere(url)}
                            className="flex flex-col gap-y-3 py-3"
                            key={index}
                          >
                            {inner}
                          </ExternalLink>
                        ) : (
                          <div
                            className="flex flex-col gap-y-3 py-3"
                            key={index}
                          >
                            {inner}
                          </div>
                        )
                      }
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-grow flex-col">
                <label
                  htmlFor="list-item-1"
                  className="label px-0.5 font-medium opacity-90"
                >
                  <span className="label-text text-lg">
                    Ask a question or paste a link here:
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-ghost input-lg flex flex-grow animate-pulse rounded-none border-l-0 border-r-0 border-t-0 border-b-gray-400 px-0.5 outline-transparent focus:outline-transparent active:outline-transparent sm:text-3xl"
                  // TODO: run through a list of these
                  placeholder="Can you make me a housewarming wishlist?"
                  ref={firstListItemRef}
                  name="list-item-1"
                  id="list-item-1"
                  onPaste={onPaste}
                />
              </div>
            )}
            <ListFadeOut />
          </form>
        </div>
      </div>
    </>
  )
}

export default HomePage
