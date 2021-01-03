import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: "https://tgif-secret-family-recipes-api.herokuapp.com/",
        headers: {
            authorization: token
        }
    })
}

export default axiosWithAuth;