import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000', // change to env var
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
