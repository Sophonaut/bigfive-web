import { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../hooks/token'
import { UserContext } from '../hooks/user'
import Invitation from './Invitation'
import http from '../config/axiosConfig'
import { toast } from 'react-toastify'

const InviteList = () => {
  const { token } = useContext(TokenContext)
  const [user, setUser] = useContext(UserContext)
  const [loading, setLoading] = useState(null)
  const [bool, setBool] = useState(false)
  const [index, setIndex] = useState(-1)

  //  On first render, retrieve invitations then set invitations state
  const handleLoad = async () => {
    console.log(`check user.invitations: ${user.invitations}`)
    // handle case where user invitations haven't been properly loaded yet
    if (!user.invitations || user.invitations.length < 1) {
      const result = await http.get(`/api/invitations/${token}`)
      const resultSuccess = result && result.data && result.data.success
      resultSuccess
        ? toast.success(result.data.message)
        : toast.error(result.data.message)
      setUser({
        ...user,
        invitations: result.data.invitations || []
      })
    }
  }

  // Hook to handleLoad then show relevant invitation info after load
  useEffect(() => {
    handleLoad()
    if (loading !== null) {
      setLoading(false)
    }
  }, [loading])

  // Handle event default behavior then pipe to updateInvites
  const handleSubmit = async (e) => {
    e.preventDefault()
    updateInvitations()
  }

  // Update models in backend for invitation behavior
  const updateInvitations = async () => {
    const params = {
      _id: user.invitations[index]._id,
      selection: bool
    }
    const res = await http.put('/api/invitations', params)
    setUser({
      ...user,
      invitations: res.data.invitations || [],
      whitelist: res.data.whitelist || []
    })
  }

  // Hook to re-render Invitations after form submission
  useEffect(() => {
    if (bool || index > -1) {
      console.log('rerendering')
      updateInvitations()
    }

    return () => {
      setBool(false)
      setIndex(-1)
    }
  }, [index])

  return loading ? <p>Loading...</p> : (
    <>
      <h3>Manage Results Sharing</h3>
      <div className='invitation'>
        {!user.invitations || user.invitations.length === 0
          ? <p>Invitation inbox is clear!</p>
          : (
            <>
              {user.invitations.map((invitation, index) => (
                <Invitation
                  key={index}
                  index={index}
                  createdBy={invitation.createdBy}
                  handleSubmit={handleSubmit}
                  setIndex={setIndex}
                  setBool={setBool}
                />
              ))}
            </>
          )}
      </div>
      <style jsx>
        {`
          .invitation {
            display: flex !important;
            flex-flow: row;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

export default InviteList
