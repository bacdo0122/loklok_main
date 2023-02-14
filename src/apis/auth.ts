import axios from 'axios';
import  {axiosInstance} from './index'
export const refreshAccessToken = async (token: string) => {
    const getToken = await axios.get(process.env.REACT_APP_API_BASE_USER_URL +'/auth/refreshToken', {
     headers: {Authorization : 'Bearer ' + token}
    });
    
    return getToken;
  };