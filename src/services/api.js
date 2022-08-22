import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.6.175:3232'
})

export default api