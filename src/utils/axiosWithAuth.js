import axios from 'axios';
import { BACKEND_URL } from '../utils/util';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: BACKEND_URL,
        headers: {
            authorization: token
        }
    })
}

export default axiosWithAuth;