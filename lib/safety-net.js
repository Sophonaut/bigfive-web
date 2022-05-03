import { getItem } from './localStorageStore'

export const safetyNet = token => {
  console.log('in safetyNet function call')
  let userToken = getItem('currentUser') || false
  if (Object.keys(userToken).length > 0) userToken = JSON.parse(userToken).token

  if (!token || StringIsEmpty(token) || !userToken) {
    console.log('safety check failed, token is invalid or empty')
    return false
  }
  console.log('no issues, returning back to caller function')
  return true
}

const StringIsEmpty = str => {
  return !!(!str || str === '')
}
