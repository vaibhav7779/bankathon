const API_ROUTES = {
  // _BASE: 'https://jsonplaceholder.typicode.com',
  _BASE: 'https://auth-api.dev.asldt.in',
  CAN_LOGIN: {
    /** @post method */
    POST: '/auth/can-login',
  },
  GENERATE_OTP_MOBILE: {
    /** @post method */
    POST: '/auth/mobile-login-with-otp-generate',
  },
  GENERATE_OTP_EMAIL: {
    /** @post method */
    POST: '/auth/email-login-with-otp-generate',
  },
  GENERATE_OTP_USERNAME: {
    /** @post method */
    POST: '/auth/username-login-with-otp-generate',
  },
  VALIDATE_OTP_MOBILE: {
    /** @post method */
    POST: '/auth/mobile-login-with-otp-validate',
  },
  VALIDATE_OTP_EMAIL: {
    /** @post method */
    POST: '/auth/email-login-with-otp-validate',
  },
  VALIDATE_OTP_USERNAME: {
    /** @post method */
    POST: '/auth/username-login-with-otp-validate',
  },
  LOGIN: {
    /** @post method */
    POST: '/auth/login',
  },
  FORGOT_PASSWORD: {
    /** @post method */
    POST: '/customers/forgot-password',
  },
  FORGOT_USERNAME: {
    /** @post method */
    POST: '/customers/forgot-username',
  },
  VALIDATE_FORGOT_OTP: {
    /** @post method */
    POST: '/customers/validate-otp',
  },
  CREATE_USERNAME: {
    /** @post method */
    POST: '/customers/create-username',
  },
  USERNAME_SUGGESTION: {
    /** @post method */
    POST: '/customer/suggest-username',
  },
  UNLOCK_ACCOUNT: {
    /** @post method */
    POST: '/customers/unlock-account',
  },
  POST_LOGIN_CHECK: {
    /** @post method */
    POST: '/customers/post-login-check',
  },
  CUSTOMER_SUPPORT: {
    /** @post method */
    POST: '/customers/support',
  },
};

export default API_ROUTES;
