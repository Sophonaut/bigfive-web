import { BehaviorSubject } from 'rxjs'
import { getItem, setItem, removeItem } from './localStorageStore'

const currentUser = getItem('currentUser')
const currentUserSubject = new BehaviorSubject(currentUser)

function login (user) {
  setItem('currentUser', JSON.stringify(user))
  currentUserSubject.next(user)
  return user
}

function logout () {
  // remove user from local storage to log user out
  removeItem('currentUser')
  currentUserSubject.next(null)
}

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
}
