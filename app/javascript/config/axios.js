import axios from "axios";

let pendingRequestCount = 0

const instance = () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async config => {
      config.headers.common["X-CSRF-TOKEN"] = document.querySelector(
        '[name="csrf-token"]'
      ).content;
      config.headers.common['Accept'] = 'application/json'
      pendingRequestCount++
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    async response => {
      pendingRequestCount--
      return response
    },
    error => {
      pendingRequestCount--
      Promise.reject(error)
    }
  )
  return axiosInstance;
};

window.pendingRequestCount = pendingRequestCount
export default instance();