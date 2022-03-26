import calculateScore from 'bigfive-calculate-score'
import getResult from '@sophonaut/b5-result-text'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
import http from '../config/axiosConfig'

export const getResultFromId = async id => {
  const formattedId = formatId(id)
  if (!validMongoId(formattedId)) throw new Error('Invalid id')
  const { data } = await http.get(`/api/get/${formattedId}`)
  const scores = calculateScore(data)
  return getResult({ scores, lang: data.lang || 'en' })
}

// Could be encrypted / decrypted to more safely handle
export const getResultFromUser = async token => {
  const { data } = await http.get(`/api/user/${token}`)
  if (!data) throw new Error("User doesn't exist, or there was some sort of error")
  const scores = calculateScore(data.result)
  return getResult({ scores, lang: data.lang || 'en' })
}
