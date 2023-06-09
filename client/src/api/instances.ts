import axios from "axios";
import { QueryClient } from "react-query";
import { io } from "socket.io-client";

/*
    AXIOS
*/
const axiosInstance = axios.create({
  baseURL: `http://10.0.1.3:8000/api`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_CANCELED") {
      return Promise.resolve({ status: 499 });
    } else {
      return Promise.reject((error.response && error.response.data) || "Error");
    }
  }
);

/*
    REACT QUERY
*/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      retry: 0,
    },
  },
});

/*
    WEBSOCKET
*/
const socket = io("http://10.0.1.3:8000");

export { axiosInstance as api, queryClient, socket };
