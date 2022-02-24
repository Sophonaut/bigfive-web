import getConfig from 'next/config'
import axios from 'axios'
import calculateScore from 'bigfive-calculate-score'
import getResult from '@sophonaut/b5-result-text'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig: { URL } } = getConfig()

const httpInstance = axios.create({
  baseURL: URL,
  timeout: 8000
})

export const getResultFromId = async id => {
  const formattedId = formatId(id)
  if (!validMongoId(formattedId)) throw new Error('Invalid id')
  const { data } = await httpInstance.get(`/api/get/${formattedId}`)
  const scores = calculateScore(data)
  return getResult({ scores, lang: data.lang || 'en' })
}

// Could be encrypted / decrypted to more safely handle
export const getResultFromUser = async token => {
  const { publicRuntimeConfig: { URL } } = getConfig()
  const httpInstance = axios.create({
    baseURL: URL,
    timeout: 8000
  })

  const { data } = await httpInstance.get(`/api/user/${token}`)
  if (!data) throw new Error("User doesn't exist, or there was some sort of error")
  const scores = calculateScore(data.result)
  return getResult({ scores, lang: data.lang || 'en' })
}
