import { useState, useEffect, useContext } from 'react'
import { Field, Button, InputText } from '../components/alheimsins'
import { TokenContext } from '../hooks/token'
import http from '../config/axiosConfig'

const InviteShare = () => {
  const [email, setEmail] = useState('')
  const { token } = useContext(TokenContext)

  useEffect(() => {
    // console.log(`email updated, new email: ${email}`)
  }, [email])

  const handleSubmit = async () => {
    const params = {
      invitee: email,
      token: token
    }
    const result = await http.post('/api/invitations', params)
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
    console.log(`validating result from post: ${JSON.stringify(result)}`)
  }

  return (
    <div className='container'>
      <Field name='Email' style={{ width: '300px' }}>
        <InputText className='input' email='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email of user to compare with' autoComplete='off' autoFocus />
      </Field>
      <Button value='Submit' type='submit' disabled={!email || !email.match(/\S+@\S+\.\S+/)} onClick={handleSubmit} />
      <style jsx>
        {`
          .container {
            display: flex;
            flex-flow: row;
            justify-content: space-around;
            align-items: center;
            min-height: 0;
          }
        `}
      </style>
    </div>
  )
}

export default InviteShare
