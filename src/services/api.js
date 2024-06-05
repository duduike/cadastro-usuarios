import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-users-ivory.vercel.app/'
})

export default api