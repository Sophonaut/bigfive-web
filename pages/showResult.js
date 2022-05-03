import { useContext, useEffect, useState } from 'react'
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
    const currentResultIsEmpty = user.currentResult && Object.keys(user.currentResult.length < 1)
    if (currentResultIsEmpty) {
      console.log('retrieving results from db')
      const ret = await getResultFromUser(token)
      setResults(doCalculation(ret.result))
      setUser({
        ...user,
        email: ret.user.email,
        invitations: ret.user.invitations || [],
        resultIds: ret.user.resultIds,
        whitelist: ret.user.whitelist,
        currentResult: ret.result
      })
    } else if (!currentResultIsEmpty) {
      console.log('hydrating results from user context')
      setResults(doCalculation(user.currentResult))
    }
  }

  useEffect(() => {
    const safetyCheck = safetyNet(token)
    if (!safetyCheck) {
      window.location = '/signup'
    } else {
      checkToken()
        .then(
          fetchData()
        )
        .then(
          setLoading(false)
        )
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [chartWidth])

  return loading ? <p>Loading...</p>
    : (
      <div>
        <h2>Result</h2>
        <Resume data={results} chartWidth={chartWidth} />
      </div>
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
