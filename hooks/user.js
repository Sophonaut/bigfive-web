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
    console.log('update user data from local storage')
    const idData = window.localStorage.getItem('id', user.id)
    const resultIdData = JSON.parse(window.localStorage.getItem('results', JSON.stringify(user.resultIds)))
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
      setUser(userData)
    }
  }, [user.id, user.resultIds.length])

  // Local Storage: SET
  useEffect(() => {
    console.log('update local storage with user data from fetch')
    if (user.id) window.localStorage.setItem('id', user.id)
    if (user.resultIds && user.resultIds.length > 0) window.localStorage.setItem('resultIds', JSON.stringify(user.resultIds))
    if (user.invitations && user.invitations.length > 0) window.localStorage.setItem('invitations', JSON.stringify(user.invitations))
    if (user.whitelist && user.whitelist.length > 0) window.localStorage.setItem('whitelist', JSON.stringify(user.whitelist))
    if (user.currentResult && Object.keys(user.currentResult).length > 0) window.localStorage.setItem('currentResult', JSON.stringify(user.currentResult))
  }, [user.resultIds.length])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// export const userState = () => useContext(UserContext)
