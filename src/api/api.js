import axios from 'axios'

const api = axios.create({
    baseURL:"http://5.189.180.8:8010/",
    headers:{
        "Content-Type":"application/json"
    }
})

export default api