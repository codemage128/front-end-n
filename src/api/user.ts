import axios from 'axios';
import { API_ENDPOINT_URL } from '../configs/appConfig';
import { UserType } from '../types/user';
import { convetToCamelCaseObject } from '../util/index';

const useUsersApi = () => {
  return {
    getUsers: async () => {
      const { data } = await axios.get(`${API_ENDPOINT_URL}/api/users/`);
      return (data as UserType[]).map((object) => convetToCamelCaseObject(object) as UserType);
    }
  };
};
export default useUsersApi;
