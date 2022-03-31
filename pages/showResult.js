import { useContext, useEffect, useState, useRef } from 'react'
// import calculateScore from 'bigfive-calculate-score'
// import getResult from '@sophonaut/b5-result-text'
import Resume from '../components/Resume'
import { getItem } from '../lib/localStorageStore'
import { getResultFromUser } from '../lib/fetch-result'
import { TokenContext } from '../hooks/token'
import { UserContext } from '../hooks/user'
// import http from '../config/axiosConfig'

const ShowResult = () => {
  const { user, setUser } = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const [chartWidth, setChartWidth] = useState(600)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  let isMounted = useRef(false)

  const checkToken = async () => {
    if (token === null) {
      console.log('in checkToken and token is null, so pulling token from localStorage')
      setToken(JSON.parse(getItem('currentUser')).token)
    }
  }

  const fetchData = async () => {
    if (isMounted) {
      const ret = await getResultFromUser(token, user, setUser)
      setResults(ret)
    }
  }

  const getWidth = () => {
    setChartWidth(window.innerWidth * 0.85)
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
      {
        results &&
          <>
            <div>
              <p>Congratulations on completing the test! Your results below are the first step towards understanding yourself so you can work with your personality (or work to change it) to grow yourself. This is meant to be used as a true mirror of how you present yourself in the world. There will be traits for which you are happy with the score and others you are not, the choice is yours to accept the results/who you are or put in the work to move the score in a direction that is more desirable for you.</p>
              <p>Interpreting results:  Your answers to the test resulted in total scores for each trait, which were then compared against the results of thousands of other individuals. The first figure displays a summary plot of your score for each of the five traits. The closer a given point is to the perimeter of the circle, the more that trait presents itself in your life as compared to others. Similarly, a point being closer to the center of the circle indicates that trait presents itself less in your life than the majority of the population.</p>
              <p>For each of the trait specific results, the figures present results in a similar fashion but with respect to each of the trait’s facets. Each figure can be viewed in as either a “Radar” or “Column” plot using the buttons in the top left of each figure, depending on your preference. In addition, your results are provided both as a raw score and as a percentage which is relative to others.</p>
            </div>
            <Resume data={results} chartWidth={chartWidth} />
          </>
      }
    </>
  )
}

export default ShowResult
