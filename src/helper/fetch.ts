import axios from 'axios'
export const fetcher = (url: string) => {
    if (url) {
      return axios
        .get(process.env.REACT_APP_API_BASE_URL+url)
        .then((res) => {       
          return res.data
        });
    }
  };