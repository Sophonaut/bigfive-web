import { useContext, useEffect, useState, useRef } from 'react'
import Resume from '../components/Resume'
import { getItem } from '../lib/localStorageStore'
import { getResultFromUser } from '../lib/fetch-result'
import { TokenContext } from '../hooks/token'
import { Layout } from '../components/alheimsins'
import AlheimsinLayout from '../layouts/AlheimsinLayout'

const ShowResult = () => {
  const { token, setToken } = useContext(TokenContext)
  const [chartWidth, setChartWidth] = useState(800)
  const [results, setResults] = useState([])
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
    if (isMounted) {
      const ret = await getResultFromUser(token)
      setResults(ret)
    }
  }

  useEffect(() => {
    checkToken()
      .then(fetchData())
      .then(() => {
        isMounted = true
        setLoading(false)
      })

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
      {/* {
        results && */}
      <>
        {/* <SocialShare url={currentUrl} /> */}
        {/* {id && <>Save the following ID to see the results later or compare yourself to others - <Code>{id}</Code></>} */}
        <Resume data={results} chartWidth={chartWidth} />
        {/* <SocialShare url={currentUrl} /> */}
      </>
      {/* } */}
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
