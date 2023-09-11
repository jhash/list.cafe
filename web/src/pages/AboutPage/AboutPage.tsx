import classNames from 'classnames'
import { PublicPeopleQuery } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import ExternalLink from 'src/components/ExternalLink/ExternalLink'
import { PublicPerson } from 'src/components/PublicPeopleCell'
import HomePageLayout from 'src/layouts/HomePageLayout/HomePageLayout'

const AboutPage = () => {
  const jake: PublicPeopleQuery['people'][number] = {
    id: 900,
    createdAt: '',
    updatedAt: '',
    visibility: 'PUBLIC',
    name: 'Jake Hash',
    pronouns: 'he/him',
    identifier: {
      id: 'jakehashtags',
    },
    images: [
      {
        id: 1,
        url: 'https://storage.googleapis.com/list-cafe/images/ee300c17-204c-448f-970f-c220b49e3c06-me-flowers-icon.png',
        alt: 'Jake Hash',
      },
    ],
  }

  return (
    <>
      <MetaTags title="About" description="About list.cafe" />

      <HomePageLayout>
        <h1 className="font-serif text-5xl leading-tight">About list.cafe</h1>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl leading-tight">
            <span className="font-semibold">list.cafe</span> was created by:
          </h3>
          <PublicPerson {...jake} />
          <h3 className="flex items-center gap-2 text-xl leading-tight">
            {'as an entry for the '}
            <ExternalLink
              href="https://build.redwoodjs.com/"
              className="link flex flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-md font-semibold no-underline hover:underline"
            >
              <img
                src="https://d33wubrfki0l68.cloudfront.net/72b0d56596a981835c18946d6c4f8a968b08e694/82254/images/logo.svg"
                alt="Redwood"
                className="max-h-8"
              />
              {'RedwoodJS Build Competition'}
            </ExternalLink>
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg leading-loose">
            {`A huge thank you to all of the creators and maintainers of open source libraries. This project would not have been possible without you.`}
          </h3>
        </div>
        <div className="flex w-full max-w-full flex-col gap-5">
          <h4 className="flex items-center gap-2 text-lg leading-normal">
            {`list.cafe was built using:`}
          </h4>
          <ul className="flex w-full max-w-full flex-col gap-3 px-1.5">
            {[
              {
                name: 'RedwoodJS',
                icon: 'https://d33wubrfki0l68.cloudfront.net/72b0d56596a981835c18946d6c4f8a968b08e694/82254/images/logo.svg',
                url: 'https://github.com/redwoodjs/redwood',
              },
              {
                name: 'Google Generative AI',
                icon: 'https://avatars.githubusercontent.com/u/2810941',
                url: 'https://github.com/GoogleCloudPlatform/generative-ai',
              },
              {
                name: 'Tailwind CSS',
                icon: 'https://avatars.githubusercontent.com/u/67109815',
                url: 'https://tailwindcss.com/',
              },
              {
                name: 'daisyUI',
                icon: 'https://raw.githubusercontent.com/saadeghi/daisyui/master/src/docs/static/images/daisyui-logo/favicon-192.png',
                url: 'https://github.com/saadeghi/daisyui',
              },
              {
                name: 'Prisma',
                icon: 'https://avatars.githubusercontent.com/u/17219288',
                url: 'https://github.com/prisma/prisma',
              },
              {
                name: 'Vercel',
                icon: 'https://avatars.githubusercontent.com/u/14985020',
                url: 'https://github.com/vercel/vercel',
              },
              {
                name: 'React',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                url: 'https://github.com/facebook/react',
              },
              {
                name: 'GraphQL',
                icon: 'https://avatars.githubusercontent.com/u/12972006?s=200&v=4',
                url: 'https://github.com/graphql',
              },
              {
                name: 'Apollo',
                icon: 'https://avatars.githubusercontent.com/u/17189275?s=48&v=4',
                url: 'https://github.com/apollographql/apollo-client',
              },
              {
                name: 'Resend',
                icon: 'https://resend.com/static/favicons/favicon@180x180.png',
                url: 'https://github.com/resendlabs',
              },
            ].map(({ url, name, icon }, index) => (
              <li key={index}>
                <ExternalLink
                  href={url}
                  className="link min-h-12 flex flex-grow items-center gap-4 rounded-md border px-4 py-2 text-xl no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
                >
                  <img src={icon} alt={name} className="w-10 rounded-md" />
                  {name}
                </ExternalLink>
              </li>
            ))}
          </ul>
          <div>{'and so much more...'}</div>
        </div>
        <div className="flex w-full max-w-full flex-col gap-5">
          <h4 className="flex items-center gap-2 text-lg leading-normal">
            {`list.cafe was inspired by:`}
          </h4>
          <ul className="flex w-full max-w-full flex-col gap-3 px-1.5">
            {[
              {
                name: 'Giftster',
                icon: 'https://play-lh.googleusercontent.com/urMhtF0tqdyyJlOYczXULDH1eb1jbkgPgjuwD2WGisUvDbwLd2v6rZnUCDt4Y1clyUXS=w480-h960-rw',
                url: 'https://www.giftster.com/',
              },
              {
                name: 'Babylist',
                icon: 'https://play-lh.googleusercontent.com/ZpTQjcJxFIGoQ4mWOXVzxYH85UgcvkBwKcJ5KSy9vf-W1wxN6xK98MjGyAUObdyHlg=w480-h960-rw',
                url: 'https://www.babylist.com/',
              },
              {
                name: 'Amazon Registry',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
                url: 'https://www.amazon.com/registries',
                className: 'bg-white rounded-lg p-1',
              },
            ].map(({ url, name, icon, className }, index) => (
              <li key={index}>
                <ExternalLink
                  href={url}
                  className="link min-h-12 flex flex-grow items-center gap-4 rounded-md border px-4 py-2 text-xl no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
                >
                  <img
                    src={icon}
                    alt={name}
                    className={classNames('w-10 rounded-md', className)}
                  />
                  {name}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </HomePageLayout>
    </>
  )
}

export default AboutPage
