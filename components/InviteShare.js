import { useState, useContext } from 'react'
import { Field, Button, InputText } from '../components/alheimsins'
import { TokenContext } from '../hooks/token'
import http from '../config/axiosConfig'
import { toast } from 'react-toastify'

const InviteShare = () => {
  const [email, setEmail] = useState('')
  const { token } = useContext(TokenContext)

  const handleSubmit = async () => {
    const params = {
      invitee: email,
      token: token
    }
    const result = await http.post('/api/invitations', params)
    const resultDataExists = result && result.data && result.data.message
    resultDataExists && result.data.success
      ? toast.success(result.data.message)
      : toast.error(result.data.message)
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
