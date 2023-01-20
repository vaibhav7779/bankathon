/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { defaultNetworkConfig } from '../config/default';
import SecureRequest from './secureRequest';

class Api {
  static SecureRequest = SecureRequest();
  authData: null;
  requestManager: any;

  constructor() {
    this.authData = null;
    this.requestManager = axios.create({
      ...defaultNetworkConfig,
    });

    this.requestManager.interceptors.request.use(
      Api.requestInterceptor,
      Api.requestInterceptorError
    );
    this.requestManager.interceptors.response.use(
      Api.responseInterceptor,
      Api.responseInterceptorError
    );
  }

  static requestInterceptor = (config: any) => {
    const request = Api.SecureRequest.getSecureAuthRequest(config);
    return request;
  };

  static requestInterceptorError = (error: any) => {
    return Promise.reject(error);
  };

  static responseInterceptor = (response: any) => {
    const newResponse = Api.SecureRequest.getResponse(response);
    return newResponse;
  };

  static responseInterceptorError = (error: any) => {
    return Promise.reject(error);
  };

  fetch = (options: any) => {
    return this.requestManager.request(options);
  };

  errorHandling = (error: { status?: boolean | number }) => {
    if (!error.status) return false;

    if (error.status === 401) {
      // ApiInstance logout method
    }

    return error.status >= 400 && error.status < 500;
  };
}

export default Api;

window.Api = Api;
