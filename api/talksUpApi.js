import axios from 'axios'

const talksUpApi = axios.create({
  //baseURL: 'https://talksupapi-s7q7i.ondigitalocean.app',
  baseURL: 'http://localhost:8080',
  headers: [
    {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  ],
})
export default talksUpApi
