import axios from 'axios';

const api = axios.create({
    baseURL: 'http://lab-tenysonpassos-com.umbler.net',
}) 

export default api;