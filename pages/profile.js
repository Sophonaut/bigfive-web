import { useEffect, useState, useRef, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ProfileContent from '../components/ProfileContent'
import { getItem } from '../lib/localStorageStore'
import { getResultFromUser } from '../lib/fetch-result'
import { TokenContext } from '../hooks/token'

const Profile = ({ props }) => {
  const { token, setToken } = useContext(TokenContext)
  const [results, setResults] = useState([])
  const [chartWidth, setChartWidth] = useState(600)
  const [loading, setLoading] = useState(true)
  let isMounted = useRef(false)

  const checkToken = async () => {
    if (!token || token === null) {
      setToken(JSON.parse(getItem('currentUser')).token)
    }
  }

  const fetchData = async () => {
    if (isMounted) {
      const ret = await getResultFromUser(token)
      setResults(ret)
    }
  }

  useEffect(() => {
    const setWidth = () => {
      console.log('resizing')
      console.log(`window.innerWidth * 0.85: ${window.innerWidth * 0.85}`)
      setChartWidth(window.innerWidth * 0.85)
    }

    window.addEventListener('resize', setWidth)
    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [chartWidth])

  useEffect(() => {
    isMounted = true

    checkToken()
      .then(fetchData())
      .then(setLoading(false))

    return () => {
      isMounted = false
    }
  }, [])

  return loading ? <p>Loading...</p> : (
    <>
      <h2>Profile</h2>
      <div className='profile-container'>
        <Sidebar className='sidebar' />
        {results &&
          <ProfileContent className='main' results={results} chartWidth={chartWidth} />}
        <style jsx>
          {`
        .profile-container {
          display: grid;
          grid-template-columns: 0.5fr 2.5fr;
          height: 100%;
          gap: 10px;
          width: 3fr;

        }

        .sidebar {
          grid-column: 1;
        }

        .main {
          grid-column: 2;
        }
        `}
        </style>
      </div>
    </>
  )
}

export default Profile
