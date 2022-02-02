import axios from "axios";

axios.interceptors.request.use((config) => {
  config.baseURL = "https://front-test.beta.aviasales.ru/";
  config.timeout = 20000;
  return config;
});

export { axios };
