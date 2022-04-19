export const setItem = (key, value) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value)
  }
}

export const getItem = key => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}

export const removeItem = key => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key)
  }
}

export const contextStore = data => {
  /**
   email: String
   results: JSON []
   invitations: JSON []
   whitelist: JSON []
  */
  console.log(JSON.stringify(data))
}

export const contextRetrieve = data => {

}

export const populateData = data => {
  setItem('inProgress', 'true')
  const { position, progress, next, previous, items } = data
  const answers = Object.assign({}, data.answers)
  setItem('b5data', JSON.stringify({ progress, next, previous, answers, position, items }))
}

export const restoreData = () => {
  const data = getItem('b5data')
  return JSON.parse(data)
}

export const getProgress = () => !!getItem('inProgress')

export const clearTestItems = () => {
  /*
    I updated this because I felt like clearItems after submission shouldn't clear the user session,
    let me know if you think otherwise and we can figure out how to handle this.
  */
  if (typeof window !== 'undefined') {
    Object.keys(window.localStorage).filter(key => {
      if (key !== 'currentUser') {
        window.localStorage.removeItem(key)
      }
    })
    // window.localStorage.clear()
  }
}

export const clearItems = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear()
  }
}
