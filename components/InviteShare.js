import { useState, useContext } from 'react'
import { Field, Button, InputText } from '../components/alheimsins'
import { TokenContext } from '../hooks/token'
import { catchLog } from '../lib/catchlog'
import http from '../config/axiosConfig'

const InviteShare = () => {
  const [email, setEmail] = useState('')
  const { token } = useContext(TokenContext)

  const handleSubmit = async () => {
    const params = {
      invitee: email,
      token: token
    }
    const result = await http.post('/api/invitations', params)
      .catch(error => catchLog(error))
    console.log(`validating result from post: ${JSON.stringify(result)}`)
  }

  return (
    <div className='wrapper'>
      <h3>Share Results With Others</h3>
      <div className='invite-container'>
        <Field name='Email' style={{ width: '300px', paddingTop: '10px' }}>
          <InputText
            className='input'
            email='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email of user to compare with'
            autoComplete='off'
            autoFocus
          />
        </Field>
        <Button value='Submit' type='submit' disabled={!email || !email.match(/\S+@\S+\.\S+/)} onClick={handleSubmit} />
      </div>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            flex-flow: column;
            min-height: 0;
          }

          .invite-container {
            display: flex;
            flex-flow: row;
            justify-content: space-around;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}

export default InviteShare
