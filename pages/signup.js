import React, { useState, useEffect } from 'react'
import { Router } from '../routes'
import { useRouter } from 'next/router'
import { Field, Button, InputText } from '../components/alheimsins'
import getConfig from 'next/config'
import axios from 'axios'
import { authenticationService } from '../lib/auth.service'

const { publicRuntimeConfig } = getConfig()
const http = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 18000
})

const SignUp = () => {
  const router = useRouter()
  const queryString = router.query
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(true)

  useEffect(() => {
    if (queryString && !!queryString.session_id) {
      setLoggingIn(false)
    } else {
      setLoggingIn(true)
    }
  })

  const handleCreateAccount = e => {
    const userData = { user: { email, password } }
    http.post(`/api/users?sessionId=${queryString.session_id}`, userData)
      .then(res => {
        console.log(res)
        authenticationService.login(res.data.user)
        Router.pushRoute('/test-prep')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      })
  }

  // TODO: Create vs login
  const handleLogin = e => {
    const userData = { user: { email, password } }
    http.post('/api/users/login', userData)
      .then(res => {
        console.log(res)
        authenticationService.login(res.data.user)
        Router.pushRoute('/result')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      })
  }
  // TODO: Add error handling

  const handleSubmit = e => {
    e.preventDefault()
    if (loggingIn) {
      handleLogin(e)
    } else {
      handleCreateAccount(e)
    }
  }

  const buttonText = () => {
    if (loggingIn) {
      return 'LOG IN'
    } else {
      return 'CREATE ACCOUNT'
    }
  }

  return (
    <div>
      <form onSubmit={e => { handleSubmit(e) }} style={{ marginTop: '40px' }}>
        <Field name='Email'>
          <InputText name='email' value={email} onChange={e => { setEmail(e.target.value) }} placeholder='Enter your email' autoComplete='off' autoFocus />
        </Field>
        <Field name='Password' style={{ marginBottom: 0 }}>
          <InputText name='password' value={password} onChange={e => { setPassword(e.target.value) }} placeholder='password' autoComplete='off' type='password' />
        </Field>

        <Button value={buttonText()} type='submit' />

      </form>
    </div>
  )
}

export default SignUp
