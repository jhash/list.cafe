import {
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useWindowSize } from '@uidotdev/usehooks'
import { Heart } from 'lucide-react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { CreateListInput, CreateListItemInput } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import ExternalLink from 'src/components/ExternalLink/ExternalLink'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import Loading from 'src/components/Loading'
import RotatingText from 'src/components/RotatingText/RotatingText'
import SectionTitle from 'src/components/SectionTitle/SectionTitle'
import { api } from 'src/lib/api'

export type DigestedItem = Omit<CreateListItemInput, 'listId'>
export type DigestedList = CreateListInput & {
  listItems: DigestedItem[]
}

const HomePage = () => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)
  const [digestedList, setDigestedList] = useState<DigestedList>()
  const firstListItemRef = useRef<HTMLInputElement>(null)

  const { height, width } = useWindowSize()

  const onSubmit = async (event?: FormEvent, text?: string) => {
    setDigestingLink(true)
    event?.preventDefault()
    event?.stopPropagation()

    const link = text || firstListItemRef.current.value

    if (!link?.trim()) {
      return
    }

    const { data } = await api.get('/digestLink', {
      params: {
        link,
      },
    })

    if (data) {
      setDigestedList(data)
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
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
        <ReactCanvasConfetti
          fire={digestingLink}
          height={height}
          width={width}
          className="sm:-translate-x-8"
        />
      </div>
      <div className="flex flex-grow select-none flex-col items-center justify-center">
        <div className="flex max-w-2xl flex-col gap-8">
          <div
            className="hidden items-center gap-x-6 font-bricolageGrotesque text-9xl tall:flex"
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
                    <SectionTitle>List Name</SectionTitle>
                    {digestedList.name}
                  </div>
                )}
                {!!digestedList.description && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>List Description</SectionTitle>
                    {digestedList.description}
                  </div>
                )}
                {!!digestedList.type && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>List Type</SectionTitle>
                    {digestedList.type}
                  </div>
                )}
                {!!digestedList.listItems.length && (
                  <div className="flex flex-col gap-y-3 divide-y">
                    <SectionTitle>Items</SectionTitle>
                    {digestedList.listItems.map(
                      ({ url, title, description, images }, index) => (
                        <ExternalLink
                          href={url}
                          className="flex flex-col gap-y-3 py-3"
                          key={index}
                        >
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
                        </ExternalLink>
                      )
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
                  <span className="label-text text-lg">Paste a link here:</span>
                </label>
                <input
                  type="text"
                  className="input input-ghost input-lg flex flex-grow animate-pulse rounded-none border-l-0 border-r-0 border-t-0 border-b-gray-400 px-0.5 outline-transparent focus:outline-transparent active:outline-transparent sm:text-3xl"
                  placeholder="Ex. astonmartin.com/models/vantage"
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
