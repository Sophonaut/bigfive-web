import { createContext, useEffect, useState } from 'react'
import { getItem } from '../lib/localStorageStore'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  let userToken = getItem('currentUser') || {}
  if (Object.keys(userToken).length > 0) userToken = JSON.parse(userToken).token

  // Right now, ID is the same as the token that's created after login
  // We could use display name or something similar
  const [user, setUser] = useState({
    id: userToken,
    resultIds: [],
    invitations: [],
    whitelist: [],
    currentResult: {}
  })

  // Local Storage: GET
  useEffect(() => {
    console.log('start GET from localstorage in UserContext')
    const idData = window.localStorage.getItem('id', user.id)
    const resultIdData = JSON.parse(window.localStorage.getItem('resultIds', JSON.stringify(user.resultIds)))
    const invitationsData = JSON.parse(window.localStorage.getItem('invitations', JSON.stringify(user.invitations)))
    const whitelistData = JSON.parse(window.localStorage.getItem('whitelist', JSON.stringify(user.whitelist)))
    const currentResultData = JSON.parse(window.localStorage.getItem('currentResult', JSON.stringify(user.currentResult)))

    const userData = {
      id: idData,
      resultIds: resultIdData,
      invitations: invitationsData,
      whitelist: whitelistData,
      currentResult: currentResultData
    }

    if (idData && resultIdData && resultIdData.length > 0) {
      console.log('updating user from local storage because condition was met')
      setUser(userData)
    }
  }, [user.resultIds.length, user.whitelist.length])

  // Local Storage: SET
  useEffect(() => {
    console.log('start SET from localstorage in UserContext')

    const idData = window.localStorage.getItem('id', user.id)
    const resultIdData = JSON.parse(window.localStorage.getItem('results', JSON.stringify(user.resultIds))) || null
    const invitationsData = JSON.parse(window.localStorage.getItem('invitations', JSON.stringify(user.invitations))) || null
    const whitelistData = JSON.parse(window.localStorage.getItem('whitelist', JSON.stringify(user.whitelist))) || null
    const currentResultData = JSON.parse(window.localStorage.getItem('currentResult', JSON.stringify(user.currentResult))) || null

    if (user.id && user.id !== idData) {
      window.localStorage.setItem('id', user.id)
      console.log('did update localstorage id in UserContext SET')
    }
    if (user.resultIds && user.resultIds.length > 0 && user.resultIds !== resultIdData) {
      window.localStorage.setItem('resultIds', JSON.stringify(user.resultIds))
      console.log('did update localstorage resultIds in UserContext SET')
    }
    if (user.invitations && user.invitations.length > 0 && user.invitations !== invitationsData) {
      window.localStorage.setItem('invitations', JSON.stringify(user.invitations))
      console.log('did update localstorage invitations in UserContext SET')
    }
    if (user.whitelist && user.whitelist.length > 0 && user.whitelist !== whitelistData) {
      window.localStorage.setItem('whitelist', JSON.stringify(user.whitelist))
      console.log('did update localstorage whitelist in UserContext SET')
    }
    if (user.currentResult && Object.keys(user.currentResult).length > 0 && user.currentResult !== currentResultData) {
      window.localStorage.setItem('currentResult', JSON.stringify(user.currentResult))
      console.log('did update localstorage currentResult in UserContext SET')
    }
  }, [user.resultIds.length, user.whitelist, user.invitations])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// export const userState = () => useContext(UserContext)
