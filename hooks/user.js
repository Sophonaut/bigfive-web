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
    results: [],
    invitations: [],
    whitelist: []
  })

  // Local Storage: GET
  useEffect(() => {
    console.log('update user data from local storage')
    const idData = window.localStorage.getItem('id', user.id)
    const resultsData = JSON.parse(window.localStorage.getItem('results', JSON.stringify(user.results)))
    const invitationsData = JSON.parse(window.localStorage.getItem('invitations', JSON.stringify(user.invitations)))
    const whitelistData = JSON.parse(window.localStorage.getItem('whitelist', JSON.stringify(user.whitelist)))

    const userData = {
      id: idData,
      results: resultsData,
      invitations: invitationsData,
      whitelist: whitelistData
    }

    if (idData && resultsData && resultsData.length > 0) {
      setUser(userData)
    }
  }, [user.id, user.results.length])

  // Local Storage: SET
  useEffect(() => {
    console.log('update local storage with user data from fetch')
    if (user.id) window.localStorage.setItem('id', user.id)
    if (user.results && user.results.length > 0) window.localStorage.setItem('results', JSON.stringify(user.results))
    if (user.invitatinos && user.invitations.length > 0) window.localStorage.setItem('invitations', JSON.stringify(user.invitations))
    if (user.whitelist && user.whitelist.length > 0) window.localStorage.setItem('whitelist', JSON.stringify(user.whitelist))
  }, [user.results.length])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// export const userState = () => useContext(UserContext)
