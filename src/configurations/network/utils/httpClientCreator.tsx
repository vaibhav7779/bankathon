/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import qs from 'qs';
import ApiError from './apiError';
import HeaderManager from './headerManager';
import DEFAULT_CONSTANTS from '../../../constants/network';
import DEFAULT_CONFIG from '../config/default';
import crypto from './crypto';
// import { LOGOUT } from 'Utils/route.constant';

const { ERROR_CLASSIFICATIONS } = ApiError;
const { STORE_KEYS_MAP } = HeaderManager;

export default function HttpClientCreator(CONFIG = {}, CONSTANTS = {}) {
  const _CONFIG = { ...DEFAULT_CONFIG, ...CONFIG };
  const _CONSTANTS = { ...DEFAULT_CONSTANTS, ...CONSTANTS };

  const {
    API_KEY,
    DISABLE_CRPTOGRAPHY,
    REQUEST_ENCRYPTION_ALOGORITHM,
    RESPONSE_DECRYPTION_ALOGORITHM,
    API_ROUTES,
  } = _CONFIG;

  const { _BASE, ...ROUTE_PATHS } = API_ROUTES;
  const routesPresent = !!Object.keys(ROUTE_PATHS || {}).length;
  if (!_BASE && routesPresent) {
    console.warn('HttpClientCreator: _BASE is not passed in API_ROUTES');
  }
  HeaderManager.set(STORE_KEYS_MAP.API_KEY, API_KEY);
  return class HttpClient {
    httpClientOptions: any;
    requestManager: any;
    constructor(options = {}) {
      this.httpClientOptions = options;

      // Function Binding
      this.attachRequestManager = this.attachRequestManager.bind(this);

      this.requestInterceptor = this.requestInterceptor.bind(this);
      this.requestInterceptorError = this.requestInterceptorError.bind(this);

      this.responseInterceptor = this.responseInterceptor.bind(this);
      this.responseInterceptorError = this.responseInterceptorError.bind(this);

      // Attching request manager
      this.attachRequestManager();
    }

    attachRequestManager() {
      const { TIMEOUT } = _CONSTANTS;
      const requestManager = axios.create({
        baseURL: _BASE,
        timeout: TIMEOUT,
        validateStatus,
      });

      // Attaching Interceptors
      requestManager.interceptors.request.use(
        this.requestInterceptor,
        this.requestInterceptorError
      );
      requestManager.interceptors.response.use(
        this.responseInterceptor,
        this.responseInterceptorError
      );
      this.requestManager = requestManager;
    }

    async requestInterceptor(request: any) {
      try {
        const { httpClientOptions } = this;
        const { requestEncryptionAlgorithm } = httpClientOptions;

        const { headers, data } = request;
        const encryptOptions = { requestEncryptionAlgorithm };
        const transformedHeaders = transformRequestHeaders(headers);
        const transformedData = await encryptRequestData(data, encryptOptions);

        const transformedRequest = {
          ...request,
          data: transformedData,
          headers: transformedHeaders,
        };
        return transformedRequest;
      } catch (error) {
        throw new ApiError(request);
      }
    }

    requestInterceptorError(error: any) {
      const classification = ERROR_CLASSIFICATIONS.CODE_ERROR;
      const errorParams = {
        statusCode: -2,
        classification,
      };
      throw new ApiError(error, errorParams);
    }

    async responseInterceptor(response: any) {
      try {
        const { httpClientOptions } = this;
        const { responseDecryptionAlgorithm } = httpClientOptions;

        const { data, headers } = response;
        const decryptionOptions = { responseDecryptionAlgorithm };
        const extractedHeaders = HeaderManager.setFromResponseHeaders(headers);

        const transformedData = await decryptResponseData(
          extractedHeaders,
          data,
          decryptionOptions
        );
        handleDecryptedResponse(transformedData);

        const transformedResponse = {
          ...response,
          data: transformedData,
        };
        return transformedResponse;
      } catch (error) {
        throw new ApiError(error);
      }
    }

    responseInterceptorError(error: any) {
      handleApiError(error);
    }

    request(options: any) {
      const requestOptions = formatRequestOptions(options);
      return this.requestManager.request(requestOptions);
    }
  };

  function transformRequestHeaders(headers: any) {
    const customeHeaders = HeaderManager.getRequestHeaders();
    const transformedHeaders = {
      ...customeHeaders,
      ...headers,
    };

    return transformedHeaders;
  }

  async function encryptRequestData(requestData: any, options: any) {
    if (DISABLE_CRPTOGRAPHY) {
      return requestData;
    }

    if (!requestData || !Object.keys(requestData).length) {
      return requestData;
    }

    const { requestEncryptionAlgorithm } = options;
    const encryptionAlgorithm = requestEncryptionAlgorithm || REQUEST_ENCRYPTION_ALOGORITHM;

    const token = HeaderManager.get(STORE_KEYS_MAP.ACCESS_TOKEN);
    const keyData = { token };
    const encryptedData = await crypto.encrypt(encryptionAlgorithm, requestData, keyData);
    return encryptedData;
  }

  async function decryptResponseData(extractedHeaders: any, responseData: any, options: any) {
    if (DISABLE_CRPTOGRAPHY) {
      return responseData;
    }

    if (!responseData || !Object.keys(responseData).length) {
      return responseData;
    }

    const { responseDecryptionAlgorithm } = options;
    const encryptionAlgorithm = responseDecryptionAlgorithm || RESPONSE_DECRYPTION_ALOGORITHM;
    const token = HeaderManager.get(STORE_KEYS_MAP.ACCESS_TOKEN);
    const keyData = { token };
    const decryptedData = await crypto.decrypt(encryptionAlgorithm, responseData, keyData);
    return decryptedData;
  }

  function handleDecryptedResponse(decryptedData: any) {
    const { statusCode, status, message, data, error } = decryptedData;

    if (!data) {
      return decryptedData;
    }

    // Handling for not our api data structure
    if (!statusCode && !status && !message && (data || error)) {
      return decryptedData;
    }

    const isValidResponse = validateStatus(statusCode);
    if (!isValidResponse) {
      const errorMap = {
        statusCode,
        message,
        classification: ERROR_CLASSIFICATIONS.API_CALL,
      };
      throw new ApiError(decryptedData, errorMap);
    }
  }

  function handleApiError(error: any) {
    const { request, response } = error;
    // Handle Axios Response Error
    if (response) {
      const { status, data: body } = response;
      const { statusCode, message } = body;
      const classification = ERROR_CLASSIFICATIONS.API_CALL;

      const errorParams = {
        statusCode: statusCode || status,
        message: message || undefined,
        classification,
      };
      const errorObj = body;
      if (errorParams.statusCode == 401) {
        // window.location.replace(`${API_ROUTES._BASE}${LOGOUT}`);
      }
      const err = new ApiError(errorObj, errorParams);
      throw err;
    }

    // Handle Axios Request Error
    if (request) {
      const classification = ERROR_CLASSIFICATIONS.NETWORK_ERROR;
      const { message } = error;
      const errorParams = {
        statusCode: -1,
        message,
        classification,
      };
      const err = new ApiError(error, errorParams);
      // logger.error(err.message, err)
      delete err.error.stack;
      throw err;
    }

    // Handle any other form of error
    const classificationCode = ERROR_CLASSIFICATIONS.CODE_ERROR;
    const errorParamsCode = {
      statusCode: -2,
      classificationCode,
    };
    const err = new ApiError(error, errorParamsCode);
    // logger.error(err.message, err)
    throw err;
  }

  function validateStatus(status: number) {
    return status >= 200 && status < 300;
  }

  function formatRequestOptions(options: any) {
    const { apiPath = '', urlParams = {}, queryParams = {}, url, ...requestOptions } = options;

    let { path: _url } = (apiPath && getPathFromApiRoutes(apiPath)) || url;
    const { method } = (apiPath && getPathFromApiRoutes(apiPath)) || url;
    _url = replaceUrlParams(_url, urlParams);
    const qsOptions: any = { arrayFormat: 'comma', allowDots: true, addQueryPrefix: true };
    _url += qs.stringify(queryParams, qsOptions);

    const reqOptions = {
      ...requestOptions,
      url: _url,
      method: method,
    };
    return reqOptions;
  }

  function getPathFromApiRoutes(apiPath: any) {
    const apiPathParts = apiPath.split('.');
    const apiPathPartsLength = apiPathParts.length;
    let path = JSON.parse(JSON.stringify(API_ROUTES));
    let method = 'GET';
    apiPathParts.forEach((key: any, index: number) => {
      path = path[key] || {};
      if (index === apiPathPartsLength - 1) {
        method = key;
      }
    });
    return { path, method };
  }

  function replaceUrlParams(pathWithParams: any, urlParams: any) {
    let url = pathWithParams;
    Object.keys(urlParams).forEach((key) => {
      const value = urlParams[key];
      url = url.replace(`:${key}`, value);
    });
    return url;
  }
}
