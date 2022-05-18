import axios from 'axios'

const talksUpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
      'api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
})
export default talksUpApi
