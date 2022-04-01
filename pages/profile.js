import { useEffect, useState, useRef, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ProfileContent from '../components/ProfileContent'
import InvitationManager from '../components/InvitationManager'
import Settings from '../components/Settings'
import { getItem } from '../lib/localStorageStore'
import { getResultFromUser, doCalculation } from '../lib/fetch-result'
import { TokenContext } from '../hooks/token'
import { UserContext } from '../hooks/user'

import { Layout } from '../components/alheimsins'
import AlheimsinLayout from '../layouts/AlheimsinLayout'

const Profile = ({ props }) => {
  const [user, setUser] = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const [results, setResults] = useState([])
  const [chartWidth, setChartWidth] = useState(600)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('dashboard')
  const [title, setTitle] = useState('Dashboard')
  let isMounted = useRef(false)

  const checkToken = async () => {
    if (!token || token === null) {
      setToken(JSON.parse(getItem('currentUser')).token)
    }
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

  return loading ? <p>Loading...</p> : (
    <>
      <h2>{title}</h2>
      <div className='profile-container'>
        <Sidebar className='sidebar' setActive={setActive} setTitle={setTitle} />
        {
          {
            dashboard: <ProfileContent className='main' setChartWidth={setChartWidth} results={results} chartWidth={chartWidth} />,
            invitations: <InvitationManager token={token} />,
            settings: <Settings />
          }[active]
        }
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

Profile.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}

export default Profile
