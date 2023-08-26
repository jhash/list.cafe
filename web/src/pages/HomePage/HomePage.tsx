import {
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Heart } from 'lucide-react'

import { MetaTags } from '@redwoodjs/web'

import ExternalLink from 'src/components/ExternalLink/ExternalLink'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import RotatingText from 'src/components/RotatingText/RotatingText'
import SectionTitle from 'src/components/SectionTitle/SectionTitle'
import { api } from 'src/lib/api'

interface DigestedImage {
  src: string
  alt: string
}

export interface DigestedLink {
  link: string
  images: DigestedImage[]
  title: string
  description: string
}

const HomePage = () => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)
  const [digestedLink, setDigestedLink] = useState<DigestedLink>()
  const firstListItemRef = useRef<HTMLInputElement>(null)

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
      setDigestedLink(data)
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
              <div>Loading...</div>
            ) : digestedLink ? (
              <ExternalLink
                href={digestedLink.link}
                className="flex flex-col gap-y-3"
              >
                {!!digestedLink.title && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Title</SectionTitle>
                    {digestedLink.title}
                  </div>
                )}
                {!!digestedLink.description && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Description</SectionTitle>
                    {digestedLink.description}
                  </div>
                )}
                {!!digestedLink.images?.length && (
                  <div className="flex flex-col gap-y-2">
                    <SectionTitle>Images</SectionTitle>
                    {digestedLink.images?.map(({ src, alt }, index) => (
                      <img key={index} src={src} alt={alt} />
                    ))}
                  </div>
                )}
              </ExternalLink>
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
