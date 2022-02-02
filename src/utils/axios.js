
import axios from 'axios'

const axiosInstance =
    axios.create({});

axiosInstance.interceptors.response.use((res) => {
    res.headers['Access-Control-Allow-Origin'] = '*';
    return res;
});
export default axiosInstance;