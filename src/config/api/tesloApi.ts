import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/storage-adapter';


export const API_URL =
  (STAGE === 'prod')
    ? PROD_URL
    : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;


//V-297,paso 1.47, ponemos el axios
const tesloApi = axios.create({
  //Paso 1.48,Aqui podemos poner toda la url ,por si no funciona
  baseURL: API_URL,
  //Paso 1.49
  headers: {
    'Content-Type': 'application/json',
  }
})

// TODO: Interceptors
//Paso 2.36
tesloApi.interceptors.request.use(
  async (config) => {

    //Checamos si en el storaje tenemos un token
    const token = await StorageAdapter.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

//Paso 1.50
export {
  tesloApi,
}

