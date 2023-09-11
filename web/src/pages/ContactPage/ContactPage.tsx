import classNames from 'classnames'

import { MetaTags } from '@redwoodjs/web'

import HomePageLayout from 'src/layouts/HomePageLayout/HomePageLayout'

const ContactPage = () => {
  return (
    <>
      <MetaTags title="Contact" description="Contact us" />

      <HomePageLayout>
        <h1 className="font-serif text-5xl leading-tight">Drop us a line</h1>
        <div
          className={classNames(
            "max-w-full' flex w-full flex-grow items-center rounded-lg border bg-inherit px-4 py-8 shadow",
            window?.matchMedia?.('(prefers-color-scheme: dark)').matches
              ? 'bg-pianoBlack'
              : 'bg-white'
          )}
        >
          <iframe
            src="https://notionforms.io/forms/get-in-touch-rdgmf6"
            title="Get in touch Notion form"
            className="min-h-[40rem] w-full"
          />
        </div>
      </HomePageLayout>
    </>
  )
}

export default ContactPage
