import axios from 'axios';
import { API_ENDPOINT_URL } from '../configs/appConfig';
import { StudyType } from '../types/analytics';
import { convetToCamelCaseObject } from '../util/index';

const useAnalyticsApi = () => {
  return {
    getData: async (userId: string, startDate: string, endDate: string) => {
      const { data } = await axios.get(`${API_ENDPOINT_URL}/api/studies?assigned_to=${userId}&date__gt=${startDate}&date__lt=${endDate}`);
      return (data as StudyType[]).map((object) => convetToCamelCaseObject(object) as StudyType);
    }
  };
};
export default useAnalyticsApi;
