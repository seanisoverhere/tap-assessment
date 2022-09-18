import apiSauce from 'apisauce'

const urlApi = apiSauce.create({
  baseURL: `${process.env.NEXT_URL}/api`
})

// READ
const getUrl = (shortUrl: string) => urlApi.get(`/url?uuid=${shortUrl}`)

// CREATE
const generateUrl = (data: any) => urlApi.post('/url', data)

export default {
  getUrl,
  generateUrl
}