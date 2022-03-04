import { useState, useEffect } from 'react'
import { Field, Button, InputText } from '../components/alheimsins'

const InviteShare = () => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    console.log(`email updated, new email: ${email}`)
  }, [email])

  const handleSubmit = () => {

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
