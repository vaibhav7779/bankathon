/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
const SecureRequest = () => {
  let tokenData: {
    // Replace with the key
    accessToken: any;
  } | null = null;
  const responseTokenKey = 'accessToken';
  const requestTokenKey = 'accessToken';

  const getAccessToken = () => {
    return tokenData;
  };

  const storeAccessToken = (response: any) => {
    if (response && response.headers) {
      tokenData = {
        // Replace with the key
        [requestTokenKey]: response.headers[responseTokenKey],
      };
    }
  };

  const getSecureAuthRequest = (unsecuredRequest: any) => {
    // mutate the reuest to pass auth data
    const accessToken = getAccessToken();
    // Implement Encryption Algo
    const securedRequest = {
      ...unsecuredRequest,
    };
    return {
      ...securedRequest,
      headers: {
        ...securedRequest.headers,
        ...accessToken,
      },
    };
  };

  const getResponse = (securedResponse: any) => {
    storeAccessToken(securedResponse);
    // Implement Decryption Algo
    const response = {
      ...securedResponse,
    };
    return response;
  };

  return {
    getSecureAuthRequest,
    getResponse,
  };
};

export default SecureRequest;
