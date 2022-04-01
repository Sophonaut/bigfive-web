import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  /*
    this currently isn't the right way to do this but we need to define what information from the user we actually need
    - results
    - invites
    - whitelist
    - email
    - some way to rewrite the password hash
  */
  const [user, setUser] = useState({
    email: '',
    results: [],
    invitations: [],
    whitelist: []
  })

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// export const userState = () => useContext(UserContext)
