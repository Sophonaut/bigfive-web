import { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../hooks/token'
import Invitation from './Invitation'
import http from '../config/axiosConfig'
import { catchLog } from '../lib/catchlog'

const InviteList = () => {
  const { token } = useContext(TokenContext)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)

  // handle requests for retrieving invitations
  const handleLoad = async () => {
    const res = await http.get(`/api/invitations/${token}`)
      .catch(error => catchLog(error))
    setInvitations(res.data.invitations)
  }

  // handle requests for confirming invitations
  const handleSubmit = async () => {
    // const res = await http.put('/api/invitations')
    console.log('accepted invitation')
  }

  useEffect(() => {
    handleLoad().then(() => setLoading(false))
  }, [loading])

  return loading ? <p>Loading...</p> : (
    <>
      <h3>Manage Results Sharing</h3>
      <div className='invitation'>
        {invitations.length === 0
          ? <p>Invitation inbox is clear!</p>
          : (
            <>
              {invitations.map((invitation, idx) => (
                <Invitation
                  key={idx}
                  createdBy={invitation.createdBy}
                  handleSubmit={handleSubmit}
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
