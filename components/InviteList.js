import { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../hooks/token'
import Invitation from './Invitation'
import http from '../config/axiosConfig'
import { catchLog } from '../lib/catchlog'

const InviteList = () => {
  const { token } = useContext(TokenContext)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [bool, setBool] = useState(false)
  const [index, setIndex] = useState(-1)

  //  On first render, retrieve invitations then set invitations state
  const handleLoad = async () => {
    const res = await http.get(`/api/invitations/${token}`)
      .catch(error => catchLog(error))
    setInvitations(res.data.invitations)
  }

  // Hook to handleLoad then show relevant profile info after load
  useEffect(() => {
    handleLoad().then(() => setLoading(false))
  }, [loading])

  // Handle event default behavior then pipe to updateInvites
  const handleSubmit = async (e) => {
    e.preventDefault()
    updateInvites()
  }

  // Update models in backend for invitation behavior
  const updateInvites = async () => {
    const params = {
      _id: invitations[index]._id,
      selection: bool
    }
    await http.put('/api/invitations', params)
      .catch(error => catchLog(error))
  }

  // Hook to re-render Invitations after form submission
  useEffect(() => {
    if (bool || index > -1) {
      updateInvites()
      const updatedInvites = invitations.filter((_, i) => i !== index)
      setInvitations([...updatedInvites])
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
        {invitations.length === 0
          ? <p>Invitation inbox is clear!</p>
          : (
            <>
              {invitations.map((invitation, index) => (
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
