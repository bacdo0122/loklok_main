import { AxiosError } from 'axios';
import get from 'lodash/get';
export const getErrorMessage = (error: AxiosError<any, any>) => {
   
  return get(error, 'response.data.message', "Something's wrong");
};
