const { API_BASE_URL, API_TIMEOUT } = process.env;

export const defaultNetworkConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT || 3000,
} as {
  baseURL?: string;
  timeout?: number;
};

const DISABLE_CRPTOGRAPHY = true;
const REQUEST_ENCRYPTION_ALOGORITHM = 'aes-256-gcm';
const RESPONSE_DECRYPTION_ALOGORITHM = 'aes-256-gcm';
const API_KEY = '';
const API_ROUTES = {
  _BASE: '',
};

const DEFAULT_CONFIG = {
  DISABLE_CRPTOGRAPHY,
  REQUEST_ENCRYPTION_ALOGORITHM,
  RESPONSE_DECRYPTION_ALOGORITHM,
  API_KEY,
  API_ROUTES,
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT || 3000,
};

export default DEFAULT_CONFIG;
