import axios from "axios";

import { API_Token, baseURL } from "../configs";

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${API_Token}`;
    return config
})

export {axiosService}