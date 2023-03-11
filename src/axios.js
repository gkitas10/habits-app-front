import axios from 'axios';

let baseURL = '';

if(process.env.NODE_ENV === 'production'){
    baseURL = 'https://habitsapp-back.onrender.com' 
}else {
    baseURL = 'http://localhost:4000'
}

const axiosClient = axios.create({
    baseURL
});

export default axiosClient;