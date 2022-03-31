// import { Layout } from '../components/alheimsins'
import React, { useState, useEffect } from 'react'
import { Router } from '../routes'
import * as gtag from '../lib/gtag'
import { authenticationService } from '../lib/auth.service'
import { TokenProvider } from '../hooks/token'
import { UserProvider } from '../hooks/user'

Router.onRouteChangeComplete = url => gtag.pageview(url)

const MyApp = ({ Component, pageProps }) => {
  const [setCurrentUser] = useState()

  useEffect(() => {
    authenticationService.currentUser.subscribe(user => setCurrentUser(user))
  })

  return (
    <TokenProvider>
      {/* <Layout user={currentUser}> */}
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      {/* </Layout> */}
    </TokenProvider>
  )
}

MyApp.getInitialProps = async ({ Component, router, ctx, ctx: { query, req } }) => {
  let componentProps = {}
  const path = req && req.url ? req.url : false
  const countryCode = req && req.requestCountryCode ? req.requestCountryCode.toLowerCase() : 'en'
  // const ip = ctx && ctx.req ? ctx.req.socket.remoteAddress : false
  if (Component.getInitialProps) {
    componentProps = await Component.getInitialProps(ctx)
  }
  const pageProps = Object.assign({}, componentProps, { query, path, countryCode })
  return { pageProps }
}

export default MyApp
