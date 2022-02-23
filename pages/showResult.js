import { useContext, useEffect, useState, useRef } from 'react'
import calculateScore from 'bigfive-calculate-score'
import getResult from '@sophonaut/b5-result-text'
import axios from 'axios'
// import { Code } from '../components/alheimsins'
import getConfig from 'next/config'
import Resume from '../components/Resume'
// import SocialShare from '../components/SocialShare'
import { getItem } from '../lib/localStorageStore'
// import validMongoId from '../lib/valid-mongoid'
// import formatId from '../lib/format-id'
import { TokenContext } from '../hooks/token'
// import { getResultFromUser } from '../lib/fetch-result'

// // TODO: convert showResult to functional component
// const getResultFromId = async id => {
//   const formattedId = formatId(id)
//   if (!validMongoId(formattedId)) throw new Error('Invalid id')
//   const { data } = await httpInstance.get(`/api/get/${formattedId}`)
//   const scores = calculateScore(data)
//   return getResult({ scores, lang: data.lang || 'en' })
// }

// // Could be encrypted / decrypted to more safely handle
// const getResultFromUser = async token => {
//   const { data } = await httpInstance.get(`/api/user/${token}`)
//   if (!data) throw new Error("User doesn't exist, or there was some sort of error")
//   const scores = calculateScore(data.result)
//   return getResult({ scores, lang: data.lang || 'en' })
// }

// export default class ShowResult extends Component {
//   static async getInitialProps ({ query }) {
//     if (query.id) {
//       const results = await getResultFromId(query.id)
//       return { results }
//     }
//   }

//   constructor (props) {
//     super(props)
//     this.state = {
//       chartWidth: 600
//     }
//     this.getWidth = this.getWidth.bind(this)
//   }

//   async componentDidMount () {
//     const token = JSON.parse(getItem('currentUser')).token
//     // const { token } = useContext(TokenContext)
//     const results = await getResultFromUser(token)
//     this.setState({ results: results })

//     window.addEventListener('resize', this.getWidth)
//     if (this.props.results) {
//       this.setState({ results: this.props.results })
//     }
//     this.getWidth()
//   }

//   componentWillUnmount () {
//     window.removeEventListener('resize', this.getWidth)
//   }

//   getWidth () {
//     const chartWidth = window.innerWidth * 0.85
//     this.setState({ chartWidth })
//   }

//   render () {
//     const { results, chartWidth } = this.state
//     const { id } = this.props.query
//     const currentUrl = URL + '/result/'
//     return (
//       <>
//         <h2>Result</h2>
//         {
//           results &&
//             <>
//               <SocialShare url={currentUrl} />
//               {id && <>Save the following ID to see the results later or compare yourself to others - <Code>{id}</Code></>}
//               <div>
//                 <p>Congratulations on completing the test! Your results below are the first step towards understanding yourself so you can work with your personality (or work to change it) to grow yourself. This is meant to be used as a true mirror of how you present yourself in the world. There will be traits for which you are happy with the score and others you are not, the choice is yours to accept the results/who you are or put in the work to move the score in a direction that is more desirable for you.</p>
//                 <p>Interpreting results:  Your answers to the test resulted in total scores for each trait, which were then compared against the results of thousands of other individuals. The first figure displays a summary plot of your score for each of the five traits. The closer a given point is to the perimeter of the circle, the more that trait presents itself in your life as compared to others. Similarly, a point being closer to the center of the circle indicates that trait presents itself less in your life than the majority of the population.</p>
//                 <p>For each of the trait specific results, the figures present results in a similar fashion but with respect to each of the trait’s facets. Each figure can be viewed in as either a “Radar” or “Column” plot using the buttons in the top left of each figure, depending on your preference. In addition, your results are provided both as a raw score and as a percentage which is relative to others.</p>
//               </div>
//               <Resume data={results} chartWidth={chartWidth} />
//               <SocialShare url={currentUrl} />
//             </>
//         }
//       </>
//     )
//   }
// }

const ShowResult = () => {
  const { publicRuntimeConfig: { URL } } = getConfig()

  const httpInstance = axios.create({
    baseURL: URL,
    timeout: 8000
  })

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

  const getResultFromUser = async token => {
    if (!token) throw new Error('Still waiting for token')

    const { data } = await httpInstance.get(`/api/user/${token}`)
    if (!data) throw new Error("User doesn't exist, or there was some sort of error")
    const scores = calculateScore(data.result)
    return getResult({ scores, lang: data.lang || 'en' })
  }

  const getWidth = () => {
    setChartWidth(window.innerWidth * 0.85)
  }

  useEffect(() => {
    isMounted = true
    const fetchData = async () => {
      if (!token) {
        setToken(JSON.parse(getItem('currentUser')).token)
      }

      if (isMounted) {
        const ret = await getResultFromUser(token)
        setResults(ret)
      }
      // return ret
    }

    checkToken()
      .then(fetchData())
      .then(setLoading(false))
    window.addEventListener('resize', getWidth)

    return () => {
      isMounted = false
      window.removeEventListener('resize', getWidth)
    }
  }, [loading, results.length])

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
            {/* <SocialShare url={currentUrl} /> */}
            {/* {id && <>Save the following ID to see the results later or compare yourself to others - <Code>{id}</Code></>} */}
            <div>
              <p>Congratulations on completing the test! Your results below are the first step towards understanding yourself so you can work with your personality (or work to change it) to grow yourself. This is meant to be used as a true mirror of how you present yourself in the world. There will be traits for which you are happy with the score and others you are not, the choice is yours to accept the results/who you are or put in the work to move the score in a direction that is more desirable for you.</p>
              <p>Interpreting results:  Your answers to the test resulted in total scores for each trait, which were then compared against the results of thousands of other individuals. The first figure displays a summary plot of your score for each of the five traits. The closer a given point is to the perimeter of the circle, the more that trait presents itself in your life as compared to others. Similarly, a point being closer to the center of the circle indicates that trait presents itself less in your life than the majority of the population.</p>
              <p>For each of the trait specific results, the figures present results in a similar fashion but with respect to each of the trait’s facets. Each figure can be viewed in as either a “Radar” or “Column” plot using the buttons in the top left of each figure, depending on your preference. In addition, your results are provided both as a raw score and as a percentage which is relative to others.</p>
            </div>
            <Resume data={results} chartWidth={chartWidth} />
            {/* <SocialShare url={currentUrl} /> */}
          </>
      }
    </>
  )
}

export default ShowResult
