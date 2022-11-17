import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dog.ceo/api',
  timeout: 8000,
  headers: {},
});

instance.interceptors.request.use(async config => {
  try {
    // config.headers["client"] = "alpha";
    // config.headers["apitoken"] = "75e142e9fd9decba5da64d86874ce5b6";
    return config;
  } catch (e) {
    console.log('axios.js error', e);
  }
});

export default instance;
