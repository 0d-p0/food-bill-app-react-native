import axios from 'axios';
import endpoints from './endPoints';

const baseURL = endpoints.baseUrl; // base URL

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpRequest = async ({method, url, data = null, token = null}) => {
  try {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default httpRequest;
