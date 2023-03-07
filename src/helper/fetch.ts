import axios from 'axios';
import { axiosInstance } from '../apis';
import { removeAccessToken, removeRefreshToken } from '../helpers/localStorage';
export const fetcher = (url: string, token: string) => {
  if (url) {
    return axiosInstance
      .get(process.env.REACT_APP_API_BASE_URL + url, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        return res.data;
      });
  }
};

export const fetcherUser = (url: string, token: string) => {
  if (url) {
    return axiosInstance
      .get(process.env.REACT_APP_API_BASE_USER_URL + url, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        return res.data;
      }).catch(()=>{
        removeAccessToken();
        removeRefreshToken();
      });
  }
};

export const fetcherWithPost = (url: string, data: any, token: string) => {
  // console.log(token )
  if (url) {
    return axiosInstance
      .post(process.env.REACT_APP_API_BASE_URL + url, data, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res: any) => {
        // console.log(res)
        return res.data;
      });
  }
};
