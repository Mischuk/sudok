import axios from "axios";
import { QueryClient } from "react-query";
import { io } from "socket.io-client";
import { ADDRESS, BASE_URL, PORT } from "utils";
/*
    AXIOS
*/
const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
const socket = io(`http://${ADDRESS}:${PORT}`);

export { axiosInstance as api, queryClient, socket };
