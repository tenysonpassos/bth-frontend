import axios from 'axios';

const urlApi = 'https://lab-tenysonpassos-com.umbler.net';
const urlApiLocal = 'http://localhost:3333';

const api = axios.create({
    baseURL: urlApi,
}) 

export default api;