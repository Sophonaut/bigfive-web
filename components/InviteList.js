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
  const handleSubmit = async (idx, bool) => {
    const params = {
      _id: invitations[idx]._id,
      selection: bool
    }
    const res = await http.put('/api/invitations', params)
      .catch(error => catchLog(error))

    /*
      TODO: Currently handling invitation updates isn't rerendering the invitations list like it should be
      Need to figure out why this is happening and force a rerender
    */
    return res.data.success
      ? () => {
        const updatedInvites = invitations.filter((_, i) => i !== idx)
        setInvitations([...updatedInvites])
      }
      : console.log('unable to update invitations')
  }

  useEffect(() => {
    handleLoad().then(() => setLoading(false))
    console.log(`handled setInvitations, invitations is updated: ${JSON.stringify(invitations)}`)
  }, [loading])

  useEffect(() => { console.log(`invitations.length: ${invitations.length}`) }, [invitations.length])

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
                  idx={idx}
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
