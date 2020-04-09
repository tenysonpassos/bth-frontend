import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lab-tenysonpassos-com.umbler.net',
}) 

export default api;