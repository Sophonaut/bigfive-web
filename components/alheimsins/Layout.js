import Head from 'next/head'
import withI18next from '../../hoc/withI18next'

const Layout = ({ children, t }) => {
  return (
    <>
      <Head>
        <title>YOUniverse</title>
        <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1' />
        <meta property='og:title' content='Find out who you are!' />
        <meta property='og:description' content='Take a comprehensive personality test with updated results, custom personal feedback and compare with others' />
        <meta property='og:image' content='/static/apple-icon-152x152.png' />
        <meta name='theme-color' content='#000000' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:creator' content='@potatodepaulo' />
        <meta name='twitter:title' content='Find out who you are!' />
        <meta name='twitter:description' content='Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' />
        <meta name='twitter:image' content='' />
        <meta name='description' content='Take a comprehensive personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' />
        <meta name='keywords' content='YOUniverse, personality traits, survey, compare' />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: '{ "@context": "http://schema.org/", "@type": "WebSite", "name": "YOUniverse Test", "url": "https://sophonaut.com" }' }} />
        <link rel='icon' sizes='192x192' href='/static/android-icon-192x192.png' />
        <link rel='apple-touch-icon' href='/static/apple-icon-152x152.png' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <link rel='manifest' href='/static/manifest.json' />

      </Head>
      {children}
      <style jsx global>
        {`
        body {
          background: white;
          color: black;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        ::selection {
          background: black;
          color: white;
        }
        a {
          text-decoration: none;
        }
        h1 {
          font-weight: 400;
          font-size: 32px;
        }
        h2 {
          color: #909090;
          font-weight: normal;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: 3% 1fr 3%;
          }
        }
      `}
      </style>
    </>
  )
}

export default withI18next(['common'])(Layout)
