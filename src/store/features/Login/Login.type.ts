export type GenerateOtpPayloadType = {
  password: string;
  loginType?: string;
  mfaType: string;
  mfaAction: string;
  mobile?: string;
  email?: string;
  username?: string;
};

export type forgotCreateOtp = {
  requestType: string;
  mobile?: string;
  email?: string;
  otpRefid: string;
  otp: string;
  newPassword?: string;
  newUsername?: string;
};

export type ValidateOtpPayloadType = {
  password: string;
  loginType?: string;
  mfaType: string;
  mfaAction: string;
  otpRefid: string;
  otp: string;
  mobile?: string;
  email?: string;
  username?: string;
  device?: any;
  deviceId: string;
};

export type setEmailMobileType = {
  email: string;
  mobile: string;
  error: { message: string };
};

export type setUsernameType = {
  username: string;
  error: { message: string };
};

export type setGenerateOtpType = {
  refId: string;
  mobileNumber: string;
};

export type setValidateOtpType = {
  accessToken: string;
  lastLoggedInAt: string;
  name: string;
  userId: string;
};

export type setForgotCreateType = {
  refId: string;
  mobile?: string;
  email?: string;
  pan?: string;
  emailMobile?: string;
};

export type postLoginCheckType = {
  postLoginCheck: string;
};
