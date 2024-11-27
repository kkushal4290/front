import axios from 'axios'

export default axios.create({
    baseURL: 'https://shareaid.pythonanywhere.com/api',
})