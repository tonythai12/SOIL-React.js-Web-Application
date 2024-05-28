import axios from 'axios';

export default class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
    });
  }

  async fetch(url, options = {}) {
    try {
      const headers = options.body instanceof FormData 
        ? {} // FormData일 경우 빈 객체
        : { 'Content-Type': 'application/json' }; // 그 외엔 json
      
      const response = await this.client.request({
        url,
        ...options,
        headers
      });
      
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      const message = error.response && error.response.data && error.response.data.message 
        ? error.response.data.message
        : 'Something went wrong! 🤪';
      const type = error.response && error.response.data && error.response.data.type
        ? error.response.data.type 
        : null;
        
      return {
        status,
        message,
        type
      };
    }
  }
}
