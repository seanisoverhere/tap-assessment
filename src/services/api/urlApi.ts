import { IGenerateUrl } from '@/types/url'
import apiSauce from 'apisauce'

const urlApi = apiSauce.create({
  baseURL: '/api'
})

// READ
const getUrl = (shortUrl: string) => urlApi.get(`/url?uuid=${shortUrl}`)

// CREATE
const generateUrl = (data: IGenerateUrl) => urlApi.post('/url', data)

export default {
  getUrl,
  generateUrl
}