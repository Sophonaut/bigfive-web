import { getItem } from './localStorageStore'

export const safetyNet = token => {
  console.log('in safetyNet function call')
  let localStorageToken = getItem('currentUser') || false
  if (Object.keys(localStorageToken).length > 0) localStorageToken = JSON.parse(localStorageToken).token

  if (!token || StringIsEmpty(token) || !localStorageToken) {
    console.log('safety check failed, token is invalid or empty')
    return false
  }
  console.log('no issues, returning back to caller function')
  return true
}

const StringIsEmpty = str => {
  return !!(!str || str === '')
}
