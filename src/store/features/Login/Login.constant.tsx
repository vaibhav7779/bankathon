import { LOCAL_STORAGE_UUID } from 'constants/storage';
import { getLocalStorage } from 'GlobalUtils';
import { fetchDeviceDetails } from 'Utils/Device';
import { onlyNumbers } from 'Utils/Validation';
import { forgotCreateOtp, GenerateOtpPayloadType, ValidateOtpPayloadType } from './Login.type';

const MFA_ACTION_GENERATE = 'GENERATE';
const MFA_ACTION_VALIDATE = 'VALIDATE';
const MFA_TYPE_OTP = 'OTP';
const LOGIN_TYPE_MOBILE = 'MOBILE';
const LOGIN_TYPE_EMAIL = 'EMAIL';
const LOGIN_TYPE_USERNAME = 'USERNAME';
export const REQUEST_TYPE_FORGOT_USERNAME = 'FORGOT USERNAME';
export const REQUEST_TYPE_FORGOT_PASSWORD = 'FORGOT PASSWORD';
export const REQUEST_TYPE_UNLOCK_ACCOUNT = 'UNLOCK ACCOUNT';
export const REQUEST_TYPE_UNLOCK_ACCOUNT_RESET = 'UNLOCK ACCOUNT RESET';
export const CREATE_USERNAME = 'CREATE USERNAME';

export const generateLoginOtpPayload = (
  password: string,
  userDetails: { mobile?: string; email?: string; username?: string }
) => {
  const payload: GenerateOtpPayloadType = {
    password,
    mfaType: MFA_TYPE_OTP,
    mfaAction: MFA_ACTION_GENERATE,
  };

  if (userDetails.mobile) {
    payload.loginType = LOGIN_TYPE_MOBILE;
    payload.mobile = userDetails.mobile;
  } else if (userDetails.email) {
    payload.loginType = LOGIN_TYPE_EMAIL;
    payload.email = userDetails.email;
  } else if (userDetails.username) {
    payload.loginType = LOGIN_TYPE_USERNAME;
    payload.username = userDetails.username;
  }

  return payload;
};

export const validateLoginOtpPayload = (
  password: string,
  userDetails: { mobile?: string; email?: string; username?: string },
  otpDetails: { otpRefid: string; otp: string }
) => {
  const payload: ValidateOtpPayloadType = {
    password,
    mfaType: MFA_TYPE_OTP,
    mfaAction: MFA_ACTION_VALIDATE,
    otpRefid: otpDetails.otpRefid,
    otp: otpDetails.otp,
    deviceId: getLocalStorage(LOCAL_STORAGE_UUID) as string,
    device: fetchDeviceDetails(),
  };

  if (userDetails.mobile) {
    payload.loginType = LOGIN_TYPE_MOBILE;
    payload.mobile = userDetails.mobile;
  } else if (userDetails.email) {
    payload.loginType = LOGIN_TYPE_EMAIL;
    payload.email = userDetails.email;
  } else if (userDetails.username) {
    payload.loginType = LOGIN_TYPE_USERNAME;
    payload.username = userDetails.username;
  }
  return payload;
};

export const forgotDetail = (emailMobile: string, pan: string) => {
  return { [onlyNumbers(emailMobile) ? 'mobile' : 'email']: emailMobile, pan };
};

export const forgotOtpValidation = (
  validateType: string,
  userDetails: {
    mobile?: string;
    email?: string;
  },
  otpDetails: { otpRefid: string; otp: string },
  newCredentials?: string
) => {
  const payload: forgotCreateOtp = {
    requestType: '',
    otpRefid: otpDetails.otpRefid,
    otp: otpDetails.otp,
  };

  switch (validateType) {
    case REQUEST_TYPE_FORGOT_PASSWORD:
    case REQUEST_TYPE_UNLOCK_ACCOUNT_RESET:
      payload.requestType = validateType;
      payload.newPassword = newCredentials;
      break;
    case CREATE_USERNAME:
      payload.requestType = validateType;
      payload.newUsername = newCredentials;
      break;
    case REQUEST_TYPE_UNLOCK_ACCOUNT:
    case REQUEST_TYPE_FORGOT_USERNAME:
      payload.requestType = validateType;
      break;
  }

  if (userDetails.mobile) {
    payload.mobile = userDetails.mobile;
  } else if (userDetails.email) {
    payload.email = userDetails.email;
  }

  return payload;
};
