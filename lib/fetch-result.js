import calculateScore from 'bigfive-calculate-score'
import getResult from '@sophonaut/b5-result-text'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
import http from '../config/axiosConfig'

export const getResultFromId = async id => {
  const formattedId = formatId(id)
  if (!validMongoId(formattedId)) throw new Error('Invalid id')
  const { data } = await http.get(`/api/get/${formattedId}`)
  return data
}

// Could be encrypted / decrypted to more safely handle
export const getResultFromUser = async token => {
  const { data } = await http.get(`/api/user/${token}`)
  if (!data) throw new Error("User doesn't exist, or there was some sort of error")

  const user = {
    email: data.user_data.email,
    resultIds: data.user_data.results,
    invites: data.user_data.invites,
    whitelist: data.user_data.whitelist,
    currentResult: data.result
  }

  return { ...data, user: user }
}

export const doCalculation = data => {
  const scores = calculateScore(data)
  return getResult({ scores, lang: data.lang || 'en' })
}
