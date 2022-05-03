import { useContext, useEffect, useState, useRef } from 'react'
import Resume from '../components/Resume'
import { getItem } from '../lib/localStorageStore'
import { safetyNet } from '../lib/safety-net'
import { getResultFromUser, doCalculation } from '../lib/fetch-result'
import { TokenContext } from '../hooks/token'
import { UserContext } from '../hooks/user'

import { Layout } from '../components/alheimsins'
import AlheimsinLayout from '../layouts/AlheimsinLayout'

const ShowResult = () => {
  const [user, setUser] = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  // we can probably do away with setResults because we're relying primarily on user/setUser from context
  const [results, setResults] = useState([])

  /*
    the local states for chartWidth & loading are important here for managing the page displayed
    it probably doesn't make sense to consolidate this into context
  */
  const [chartWidth, setChartWidth] = useState(800)
  const [loading, setLoading] = useState(true)
  let isMounted = useRef(false)

  const checkToken = async () => {
    if (!token || token === null) {
      console.log('in checkToken and token is null, so pulling token from localStorage')
      setToken(JSON.parse(getItem('currentUser')).token)
    }
  }

  const getWidth = () => {
    setChartWidth(window.innerWidth * 0.85)
  }

  const fetchData = async () => {
    if (isMounted && user.results.length < 1) {
      console.log('retrieving results from db')
      const ret = await getResultFromUser(token)
      setResults(ret.result)
      setUser({
        ...user,
        email: ret.user.email,
        invitations: ret.user.invitations || [],
        results: ret.user.results,
        whitelist: ret.user.whitelist
      })
    } else if (user.results.length > 0) {
      console.log('hydrating results from user context')
      const userResult = user.results.slice(-1).pop()
      setResults(doCalculation(userResult))
    }
  }

  useEffect(() => {
    const safetyCheck = safetyNet(token)
    if (!safetyCheck) {
      console.log('safety check failed, redirecting to /signup')
      window.location = '/signup'
    } else {
      console.log('safety check passed, fetching data')
      checkToken()
        .then(fetchData())
        .then(() => {
          isMounted = true
          setLoading(false)
        })
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [chartWidth])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h2>Result</h2>
      <Resume data={results} chartWidth={chartWidth} />
    </>
  )
}

ShowResult.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}

export default ShowResult
