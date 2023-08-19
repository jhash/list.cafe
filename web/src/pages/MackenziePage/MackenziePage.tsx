import { Heart, Link2 } from 'lucide-react'

import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'

const MackenziePage = () => {
  return (
    <>
      <MetaTags title="Mackenzie" description="Mackenzie page" />

      <div className="flex flex-grow select-none flex-col items-center justify-center">
        <div className="container flex flex-col gap-8">
          <div className="items-center gap-x-6 font-bricolageGrotesque text-7xl">
            Thank you so much!
          </div>
          <div className="flex items-center gap-x-6 font-bricolageGrotesque text-5xl">
            I love you
            <Heart
              className="fill-purple-600"
              strokeOpacity={0.05}
              strokeWidth={0.75}
              size="3rem"
            />
          </div>
          <ul className="flex flex-col divide-y border-y">
            {[
              { url: 'https://amzn.to/3QLJfcL', name: 'Laundry cart' },
              { url: 'https://amzn.to/44dck41', name: 'Shelf liner' },
            ].map(({ url, name }, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={url}
                  className="link flex h-16 items-center gap-4 px-2 text-xl"
                  target="_top"
                >
                  <Link2 />
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <ListFadeOut />
        </div>
      </div>
    </>
  )
}

export default MackenziePage
