import axios from 'axios';

export default class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
    });
  }

  async fetch(url, options = {}) {
    try {
      const headers = options.headers
        ? options.headers
        : { 'Content-Type': 'application/json' };

      const response = await this.client.request({
        url,
        ...options,
        headers,
        data: options.body,
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Something went wrong! 🤪';
      const type =
        error.response && error.response.data && error.response.data.type
          ? error.response.data.type
          : null;

      return {
        status,
        message,
        type,
      };
    }
  }
}
