import axios from "axios";
import config from "./config/app";

export const api = {
  get: async (endpoint, headers = {}) => {
    try {
      const url = `${config.apiUrl}${endpoint}`;

      const { data: response } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
  post: async (endpoint, data, headers = {}) => {
    try {
      const url = `${config.apiUrl}${endpoint}`;

      const { data: response } = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
  delete: async (endpoint, headers = {}) => {
    try {
      const url = `${config.apiUrl}${endpoint}`;

      const { data: response } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
};
