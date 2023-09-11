import { MetaTags } from '@redwoodjs/web'

import HomePageLayout from 'src/layouts/HomePageLayout/HomePageLayout'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About list.cafe" />

      <HomePageLayout>
        <h1 className="font-serif text-5xl leading-tight">About us</h1>
      </HomePageLayout>
    </>
  )
}

export default AboutPage
