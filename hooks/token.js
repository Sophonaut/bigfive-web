import { createContext, useContext, useEffect, useState } from 'react'
import { getItem } from '../lib/localStorageStore'

export const TokenContext = createContext(null)

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    let userToken = getItem('currentUser') || {}
    if (Object.keys(userToken).length > 0) userToken = JSON.parse(userToken).token
    setToken(userToken)
  }, [])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => useContext(TokenContext)
