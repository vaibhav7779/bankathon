/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DEFAULT_CONSTANTS from '../../../constants/network';

const {
  ACCESS_TOKEN_REQUEST_HEADER_KEY,
  ACCESS_TOKEN_RESPONSE_HEADER_KEY,

  SESSION_ID_REQUEST_HEADER_KEY,
  SESSION_ID_RESPONSE_HEADER_KEY,

  API_KEY_HEADER_KEY,

  APP_UID_REQUEST_HEADER_KEY,
  APP_UID_RESPONSE_HEADER_KEY,
} = DEFAULT_CONSTANTS;

const STORE_KEYS_MAP: { [key: string]: string } = {
  API_KEY: 'API_KEY',
  SESSION_ID: 'SESSION_ID',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  APP_UID: 'APP_UID',
};

const CUSTOM_HEADER_CONFIG = [
  {
    REQUEST_HEADER_KEY: API_KEY_HEADER_KEY,
    RESPONSE_HEADER_KEY: API_KEY_HEADER_KEY,
    STORE_KEY: STORE_KEYS_MAP.API_KEY,
  },
  {
    REQUEST_HEADER_KEY: SESSION_ID_REQUEST_HEADER_KEY,
    RESPONSE_HEADER_KEY: SESSION_ID_RESPONSE_HEADER_KEY,
    STORE_KEY: STORE_KEYS_MAP.SESSION_ID,
  },
  {
    REQUEST_HEADER_KEY: ACCESS_TOKEN_REQUEST_HEADER_KEY,
    RESPONSE_HEADER_KEY: ACCESS_TOKEN_RESPONSE_HEADER_KEY,
    STORE_KEY: STORE_KEYS_MAP.ACCESS_TOKEN,
  },
  {
    REQUEST_HEADER_KEY: APP_UID_REQUEST_HEADER_KEY,
    RESPONSE_HEADER_KEY: APP_UID_RESPONSE_HEADER_KEY,
    STORE_KEY: STORE_KEYS_MAP.APP_UID,
  },
];

const HEADER_STORE: { [key: string]: string } = {};

const DEFAULT_SET_OPTIONS = {
  force: false,
};

const HeaderManager = {
  STORE_KEYS_MAP,

  get,
  set,
  del,

  getRequestHeaders,
  setFromResponseHeaders,
};
export default HeaderManager;

function get(key = '') {
  const storeKey = STORE_KEYS_MAP[key];

  if (!storeKey) {
    return;
  }

  return HEADER_STORE[key];
}

function set(key = '', value = '', options = DEFAULT_SET_OPTIONS) {
  const storeKey = STORE_KEYS_MAP[key];

  if (!storeKey) {
    return;
  }

  const setOptions = { ...DEFAULT_SET_OPTIONS, ...options };
  const { force } = setOptions;

  const currentValue = HEADER_STORE[key];

  if (force) {
    HEADER_STORE[key] = value;
  } else {
    HEADER_STORE[key] = value || currentValue;
  }

  return HEADER_STORE[key];
}

function del(key = '') {
  const storeKey = STORE_KEYS_MAP[key];

  if (!storeKey) {
    return;
  }

  const currentValue = HEADER_STORE[key];
  delete HEADER_STORE[key];
  return currentValue;
}

function getRequestHeaders() {
  const requestHeaders = CUSTOM_HEADER_CONFIG.reduce(
    (object: { [key: string]: string }, config) => {
      const { REQUEST_HEADER_KEY, STORE_KEY } = config;
      const headerValue = HEADER_STORE[STORE_KEY];
      if (headerValue && REQUEST_HEADER_KEY) {
        object[REQUEST_HEADER_KEY.toLowerCase()] = headerValue;
      }
      return object;
    },
    {}
  );

  return requestHeaders;
}

function setFromResponseHeaders(headers: { [key: string]: any }) {
  CUSTOM_HEADER_CONFIG.forEach((config) => {
    const { RESPONSE_HEADER_KEY, STORE_KEY } = config;
    const headerValue = headers[RESPONSE_HEADER_KEY.toLowerCase()];
    if (headerValue) {
      set(STORE_KEY, headerValue);
    }
  });

  return HEADER_STORE;
}
