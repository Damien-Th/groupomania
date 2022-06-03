import axios from 'axios';
const  URL_SERVER = process.env.REACT_APP_URL_SERVER;

export default axios.create({

  baseURL: URL_SERVER,
  headers: { 
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true


});

export const instanceAxios = axios.create({
  
  baseURL: URL_SERVER,
  headers: { 
    'content-Type': 'application/json',
  },
  withCredentials: true
   
});