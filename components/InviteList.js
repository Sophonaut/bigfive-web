import { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../hooks/token'
import Invitation from './Invitation'
import http from '../config/axiosConfig'

const InviteList = () => {
  const { token } = useContext(TokenContext)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)

  // handle requests for retrieving invitations
  const handleLoad = async () => {
    const res = await http.get(`/api/invitations/${token}`)
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })

    console.log(res.data)
    setInvitations(res.data.invitations)
  }

  // handle requests for confirming invitations
  const handleSubmit = async () => {
    console.log('accepted invite!')
  }

  useEffect(() => {
    handleLoad()
      .then(() => {
        setLoading(false)
      })
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
                <Invitation key={idx} createdBy={invitation.createdBy} handleSubmit={handleSubmit} />
              ))}
            </>
          )}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-flow: column;
          }

          .invitation {
            display: flex !important;
            flex-flow: row;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }

          .buttons {
            display: flex;
            flex-flow: row;
            justify-content: space-around;
            align-items: center;
            width: 25%;
            min-width: 170px;
          }

          .invite-list {
            height: 100%;
          }
        `}
      </style>
    </>
  )
}

export default InviteList
