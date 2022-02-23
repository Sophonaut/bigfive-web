import { Layout } from '../components/alheimsins'
import React, { useState, useEffect } from 'react'
import { Router } from '../routes'
import * as gtag from '../lib/gtag'
import { authenticationService } from '../lib/auth.service'
import { TokenProvider } from '../hooks/token'

Router.onRouteChangeComplete = url => gtag.pageview(url)

// export default class MyApp extends App {
//   constructor (props) {
//     super(props)
//     this.state = { currentUser: authenticationService.currentUserValue }
//   }

//   componentDidMount () {
//     authenticationService.currentUser.subscribe(user => this.setState({ currentUser: user }))
//   }

//   static async getInitialProps ({ Component, router, ctx, ctx: { query, req } }) {
//     let componentProps = {}
//     const path = req && req.url ? req.url : false
//     const countryCode = req && req.requestCountryCode ? req.requestCountryCode.toLowerCase() : 'en'
//     // const ip = ctx && ctx.req ? ctx.req.socket.remoteAddress : false
//     if (Component.getInitialProps) {
//       componentProps = await Component.getInitialProps(ctx)
//     }
//     const pageProps = Object.assign({}, componentProps, { query, path, countryCode })
//     return { pageProps }
//   }

//   render () {
//     const { Component, pageProps } = this.props
//     const { currentUser } = this.state
//     return (
//       <TokenProvider>
//         <Layout user={currentUser}>
//           <Component {...pageProps} />
//         </Layout>
//       </TokenProvider>
//     )
//   }
// }

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    authenticationService.currentUser.subscribe(user => setCurrentUser(user))
  })

  return (
    <TokenProvider>
      <Layout user={currentUser}>
        <Component {...pageProps} />
      </Layout>
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
