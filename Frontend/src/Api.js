import Axios from 'axios'

const Api = Axios.create({
    baseURL: 'http://localhost:3001'
});

export default Api;