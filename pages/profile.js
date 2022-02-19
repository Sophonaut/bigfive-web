// import { useEffect, useState, useRef } from 'react'
// import Sidebar from '../components/Sidebar'
// import ProfileContent from '../components/ProfileContent'
// import { getItem } from '../lib/localStorageStore'
// import { getResultFromUser } from '../lib/fetch-result'
import ShowResult from './showResult'

const Profile = ({ props }) => {
  // const [results, setResults] = useState({ results: {} })
  // const [chartWidth, setChartWidth] = useState(0)
  // const [loading, setLoading] = useState(true)
  // let isMounted = useRef(false)

  // // useEffect(async () => {
  // //   getResultFromUser()
  // //     .then(result => {
  // //       setResults({ result: result })
  // //     })
  // //   const chartWidth = window.innerWidth * 0.85
  // //   setChartWidth({ chartWidth })
  // // }, [chartWidth])

  // const checkToken = async () => {
  //   if (token === null) {
  //     console.log(`in checkToken and token is null`)
  //     setToken(JSON.parse(getItem('currentUser')).token)
  //   }
  // }

  // useEffect(() => {
  //   isMounted = true
  //   const fetchData = async () => {

  //     if (!token) {
  //       setToken(JSON.parse(getItem('currentUser')).token)
  //     }

  //     if (isMounted) {
  //       const ret = await getResultFromUser(token)
  //       setResults(ret)
  //     }
  //     // return ret
  //   }

  //   checkToken()
  //     .then(fetchData())
  //     .then(setLoading(false))
  //   window.addEventListener('resize', getWidth)

  //   return () => {
  //     isMounted = false
  //     window.removeEventListener('resize', getWidth)
  //   }
  // }, [loading, results.length])

  // if (loading) return <p>Loading...</p>

  return (
  // <>
  //   <h2>Profile</h2>
  //   <div className='profile-container'>
  //     <Sidebar className='sidebar' />
  //     <ProfileContent className='main' results={results} chartWidth={chartWidth}/>
  //     <style jsx>
  //       {`
  //       .profile-container {
  //         display: grid;
  //         grid-template-columns: 0.5fr 2.5fr;
  //         min-height: 100vh;
  //         gap: 10px;
  //       }

  //       .sidebar {
  //         grid-column: 1;
  //       }

    //       .main {
    //         grid-column: 2;
    //       }
    //       `}
    //     </style>
    //   </div>
    // </>
    <ShowResult />
  )
}

// Profile.getInitialProps = async () => {
//   const results = await getResultFromUser()
//   return { results }
// }

export default Profile
