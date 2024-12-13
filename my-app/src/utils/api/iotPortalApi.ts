// workers.ts
import axios from 'axios';
import { GetJWTToken } from '../../utils';
import { config } from '../../config';

const IOT_URL_IKN = 'http://202.59.9.164:5000';

const api = axios.create({
    baseURL: IOT_URL_IKN, 
    headers: {
        Authorization: `${GetJWTToken()}`,
    },
    validateStatus: (status) => status >= 200 && status < 600, // Don't throw an error for status codes 200-599
});

api.interceptors.request.use(async (config) => {
  const JWTToken = await GetJWTToken();
  if (JWTToken) {
    config.headers.Authorization = `${JWTToken}`;
  }
  return config;
});


const getIOTPortal = async () => {
  // ------
  // axios.defaults.headers.common['x-auth-token'] = token["token"];
  axios.defaults.headers.common['x-auth-token'] = config.Web_AccessToken;
  let _day0: Date = new Date();
  let _day1: Date = new Date();
  _day0.setHours(-23,0,0);
  _day1.setHours(23,59,59);
  const params = { totalLines : 1000, date0:_day0, date1:_day1 };
  // --------------
  const response = await axios.get(IOT_URL_IKN+'/api/sensors/shinko/rawdata',{params});
  if (response.status !== 200) return null;
  return response.data
};

export { getIOTPortal };