import { createContext, useEffect, useState } from 'react'
import { getItem } from '../lib/localStorageStore'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  let userToken = getItem('currentUser') || {}
  if (Object.keys(userToken).length > 0) userToken = JSON.parse(userToken).token
  /*
    this currently isn't the right way to do this but we need to define what information from the user we actually need
    - results
    - invites
    - whitelist
    - id
    - some way to rewrite the password hash
  */
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

    console.log(`
      Print 
      idData: ${idData}
      resultsData: ${resultsData}
      invitationsData: ${invitationsData}
      whitelistData: ${whitelistData}
    `)

    const userData = {
      id: idData,
      results: resultsData,
      invitations: invitationsData,
      whitelist: whitelistData
    }

    console.log(userData)

    if (user.id && user.results.length > 0 && user.invitations.length > 0 && user.whitelist.length > 0) {
      setUser(userData)
    }
  }, [user])

  // Local Storage: SET
  // TODO: Right now, we're not detecting changes between users once data is onboarded
  // TODO: Find a way to update arrays in local storage
  useEffect(() => {
    console.log('update local storage with user data from fetch')
    if (user.id) window.localStorage.setItem('id', user.id)
    if (user.results.length > 0) window.localStorage.setItem('results', JSON.stringify(user.results))
    if (user.invitations.length > 0) window.localStorage.setItem('invitations', JSON.stringify(user.invitations))
    if (user.whitelist.length > 0) window.localStorage.setItem('whitelist', JSON.stringify(user.whitelist))

    window.localStorage.setItem('id', user.id)
    window.localStorage.setItem('results', JSON.stringify(user.results))
    window.localStorage.setItem('invitations', JSON.stringify(user.invitations))
    window.localStorage.setItem('whitelist', JSON.stringify(user.whitelist))
  }, [user.id, user.results.length, user.invitations.length, user.whitelist.length])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// export const userState = () => useContext(UserContext)
