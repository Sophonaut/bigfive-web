import React, { useState, useEffect } from 'react'
import { Router } from '../routes'
import { useRouter } from 'next/router'
import { Field, Button, InputText, Layout } from '../components/alheimsins'
import { authenticationService } from '../lib/auth.service'
import { useToken } from '../hooks/token'
import http from '../config/axiosConfig'

import AlheimsinLayout from '../layouts/AlheimsinLayout'

// I think local state here is okay, we're using it only temporarily for the login/signup functionality
// TODO: Pull user data on login
// TODO: Stash UserContext on successful query in LocalStorage until logout.
const SignUp = () => {
  const router = useRouter()
  const queryString = router.query
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loggingIn, setLoggingIn] = useState(true)
  const { setToken } = useToken()

  useEffect(() => {
    if (queryString && !!queryString.session_id) {
      setLoggingIn(false)
    } else {
      setLoggingIn(true)
    }
  })

  // TODO: Handle create nickname, make required
  const handleCreateAccount = e => {
    const userData = { user: { email, password, nickname } }
    http.post(`/api/users?sessionId=${queryString.session_id}`, userData)
      .then(res => {
        console.log(res)
        authenticationService.login(res.data.user)
        setToken(res.data.user.token)
        Router.pushRoute('/test-prep')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      }
      )
  }

  // TODO: Create vs login
  const handleLogin = async e => {
    const userData = { user: { email, password } }
    const res = await http.post('/api/users/login', userData)
    authenticationService.login(res.data.user)
    setToken(res.data.user.token)
    Router.pushRoute('/result')
    // http.post('/api/users/login', userData)
    //   .then(res => {
    //     authenticationService.login(res.data.user)
    //     setToken(res.data.user.token)
    //     Router.pushRoute('/result')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     console.log(err.response)
    //   })
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
        <Field name='Password'>
          <InputText name='password' value={password} onChange={e => { setPassword(e.target.value) }} placeholder='password' autoComplete='off' type='password' />
        </Field>
        {loggingIn
          ? (<></>)
          : (
            <Field name='Nickname' style={{ marginBottom: 0 }}>
              <InputText name='password' value={nickname} onChange={e => { setNickname(e.target.value) }} placeholder='nickname' autoComplete='off' />
            </Field>
          )}

        <Button value={buttonText()} type='submit' />

      </form>
    </div>
  )
}

SignUp.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}

export default SignUp
