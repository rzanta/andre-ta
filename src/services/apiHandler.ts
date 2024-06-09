import axios from "axios";

export const ApiHandler = axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
    timeout: 1500,    
});




