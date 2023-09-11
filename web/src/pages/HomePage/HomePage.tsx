import { useState } from 'react'

import { Heart } from 'lucide-react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { CreateListInput, CreateListItemInput } from 'types/graphql'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import { ListPrompt } from 'src/components/ListPrompt/ListPrompt'
import RotatingText from 'src/components/RotatingText/RotatingText'
import HomePageLayout from 'src/layouts/HomePageLayout/HomePageLayout'

export type DigestedItem = Omit<CreateListItemInput, 'listId'>
export type DigestedList = CreateListInput & {
  listItems: DigestedItem[]
  headerImage?: string
}

const HomePage = () => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)

  return (
    <>
      <MetaTags title="Home" description="List all of the things" />
      <BrowserOnly>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
          <ReactCanvasConfetti
            fire={digestingLink}
            height={window?.innerHeight}
            width={window?.innerWidth}
            // className="sm:-translate-x-6"
          />
        </div>
      </BrowserOnly>
      <HomePageLayout>
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
        <ListPrompt
          onStart={() => setDigestingLink(true)}
          onEnd={() => setDigestingLink(false)}
        >
          <ListFadeOut />
        </ListPrompt>
      </HomePageLayout>
    </>
  )
}

export default HomePage
