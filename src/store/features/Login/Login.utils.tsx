import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountDetails } from 'constants/storage';

import { onlyNumbers } from 'Utils/Validation';
import { ExtraArgument } from '../..';

import {
  generateLoginOtpPayload,
  validateLoginOtpPayload,
  forgotDetail,
  forgotOtpValidation,
} from './Login.constant';

export const setEmailMob = createAsyncThunk(
  'login/setEmailMobile',
  // need to pass type for params (object, string, number, array or any) according to dispatched payload
  async (params: { payload: object }, { extra, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'CAN_LOGIN.POST',
        data: payload,
      };

      const { data: data } = await API.request(options);

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }

      return { ...payload, ...data };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

export const setUserName = createAsyncThunk(
  'login/setUsername',
  async (params: { payload: object }, { extra, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'CAN_LOGIN.POST',
        data: payload,
      };

      const { data: data } = await API.request(options);

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return { ...payload, ...data };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

export const validateUser = createAsyncThunk(
  'login/validateUser',
  async (
    params: { payload: { emailMobile: string; userPan: string } },
    { extra, rejectWithValue }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'USER.GET',
      };

      const { data: data } = await API.request(options);
      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return payload;
    } catch (e) {
      return { error: e };
    }
  }
);

export const generateOtp = createAsyncThunk(
  'login/generateOtp',
  async (
    params: { payload: { password: string; emailMob: string; userName: string } },
    { extra, rejectWithValue }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { password, emailMob, userName } = params.payload;

      if (emailMob !== '') {
        if (onlyNumbers(emailMob)) {
          const otpPayload = generateLoginOtpPayload(password, { mobile: emailMob });

          // API request payload options
          const options = {
            apiPath: 'GENERATE_OTP_MOBILE.POST',
            data: otpPayload,
          };

          const {
            data: { data: body },
          } = await API.request(options);

          if (body.error) {
            const { message } = body.error;
            return rejectWithValue({
              error: { message },
            });
          }

          return body;
        } else {
          const otpPayload = generateLoginOtpPayload(password, { email: emailMob });

          // API request payload options
          const options = {
            apiPath: 'GENERATE_OTP_EMAIL.POST',
            data: otpPayload,
          };

          const { data: data } = await API.request(options);
          const { data: body } = data;

          if (data.error) {
            const { message } = data.error;
            return rejectWithValue({
              error: { message },
            });
          }
          return body;
        }
      } else if (userName !== '') {
        const otpPayload = generateLoginOtpPayload(password, { username: userName });

        // API request payload options
        const options = {
          apiPath: 'GENERATE_OTP_USERNAME.POST',
          data: otpPayload,
        };

        const { data: data } = await API.request(options);
        const { data: body } = data;

        if (data.error) {
          const { message } = data.error;
          return rejectWithValue({
            error: { message },
          });
        }
        return body;
      }
    } catch (e: any) {
      const { code } = e?.error;

      return rejectWithValue({
        error: { ...e?.error, isDispatch: code !== 1005 },
      });
    }
  }
);

export const validateOtp = createAsyncThunk(
  'login/validateOtp',
  async (
    params: { payload: { password: string; emailMob: string; userName: string; otp: string } },
    { extra, getState, rejectWithValue, dispatch }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { login } = getState() as any;
      const { refId } = login.otpGenerate;
      const { password, emailMob, userName, otp } = params.payload;
      let body;

      if (emailMob !== '') {
        if (onlyNumbers(emailMob)) {
          const otpPayload = validateLoginOtpPayload(
            password,
            { mobile: emailMob },
            { otpRefid: refId, otp }
          );

          // API request payload options
          const options = {
            apiPath: 'VALIDATE_OTP_MOBILE.POST',
            data: otpPayload,
          };

          const { data: data } = await API.request(options);
          body = data.data;

          if (data.error) {
            const { message } = data.error;
            return rejectWithValue({
              error: { message },
            });
          }
        } else {
          const otpPayload = validateLoginOtpPayload(
            password,
            { email: emailMob },
            { otpRefid: refId, otp }
          );

          // API request payload options
          const options = {
            apiPath: 'VALIDATE_OTP_EMAIL.POST',
            data: otpPayload,
          };

          const { data: data } = await API.request(options);
          body = data.data;

          if (data.error) {
            const { message } = data.error;
            return rejectWithValue({
              error: { message },
            });
          }
        }
      } else if (userName !== '') {
        const otpPayload = validateLoginOtpPayload(
          password,
          { username: userName },
          { otpRefid: refId, otp }
        );

        // API request payload options
        const options = {
          apiPath: 'VALIDATE_OTP_USERNAME.POST',
          data: otpPayload,
        };

        const { data: data } = await API.request(options);
        body = data.data;

        if (data.error) {
          const { message } = data.error;
          return rejectWithValue({
            error: { message },
          });
        }
      }

      dispatch(
        postLoginCheck({
          payload: {
            userId: body.userId,
          },
        })
      );

      return body;
    } catch (e: any) {
      const { code } = e?.error;
      return rejectWithValue({
        error: { ...e?.error, isDispatch: !(code !== 1016 || code !== 1056) },
      });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'login/forgotPassword',
  async (params: { emailMobile: string; pan: string }, { extra, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      const { emailMobile, pan } = params;

      // API request payload options
      const options = {
        apiPath: 'FORGOT_PASSWORD.POST',
        data: forgotDetail(emailMobile, pan),
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return { ...body, pan, emailMobile };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

export const forgotUsername = createAsyncThunk(
  'login/forgotUsername',
  async (params: { emailMobile: string; pan: string }, { extra, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      const { emailMobile, pan } = params;

      // API request payload options
      const options = {
        apiPath: 'FORGOT_USERNAME.POST',
        data: forgotDetail(emailMobile, pan),
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return { ...body, pan };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

export const validateForgotOtp = createAsyncThunk(
  'login/validateForgotOtp',
  async (
    params: { validateType: string; emailMobile: string; otp: string; newCredentials?: string },
    { extra, getState, rejectWithValue }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { login } = getState() as any;
      const { validateType, emailMobile, otp, newCredentials } = params;
      const { refId } = login.forgotCreateDetails;

      // API request payload options
      const options = {
        apiPath: 'VALIDATE_FORGOT_OTP.POST',
        data: forgotOtpValidation(
          validateType,
          { [onlyNumbers(emailMobile) ? 'mobile' : 'email']: emailMobile },
          { otpRefid: refId, otp },
          newCredentials
        ),
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return body;
    } catch (e: any) {
      const { code } = e?.error;
      return rejectWithValue({
        error: { ...e?.error, isDispatch: !(code !== 1016 || code !== 1056) || code === 1021 },
      });
    }
  }
);

export const createUsername = createAsyncThunk(
  'login/createUsername',
  async (
    params: { payload: { pan: string; mobile?: string; email?: string } },
    { extra, rejectWithValue }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'CREATE_USERNAME.POST',
        data: payload,
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return { ...body, pan: payload.pan, emailMobile: payload.mobile || payload.email };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

// export const usernameSuggestion = createAsyncThunk(
//   'login/usernameSuggestion',
//   async (params: { payload: object }, { extra }) => {
//     try {
//       const { API } = extra as ExtraArgument;
//       const { payload } = params;

//       const options = {
//         apiPath: 'USERNAME_SUGGESTION.POST',
//         data: payload,
//       };

//       const { data: data } = await API.request(options);
//       return data;
//     } catch (e) {
//       return { error: e };
//     }
//   }
// );

export const unlockAccount = createAsyncThunk(
  'login/unlockAccount',
  async (
    params: { payload: { pan: string; mobile?: string; email?: string } },
    { extra, rejectWithValue }
  ) => {
    try {
      const { API } = extra as ExtraArgument;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'UNLOCK_ACCOUNT.POST',
        data: payload,
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }
      return { ...body, pan: payload.pan, emailMobile: payload.mobile || payload.email };
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: true },
      });
    }
  }
);

export const postLoginCheck = createAsyncThunk(
  'login/postLoginCheck',
  async (params: { payload: any }, { extra, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      // const { login } = getState() as any;
      // const { token: accessToken } = login.otpValidate;
      const { payload } = params;

      // API request payload options
      const options = {
        apiPath: 'POST_LOGIN_CHECK.POST',
        data: {
          userId: payload.userId,
        },
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }

      return body;
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: false },
      });
    }
  }
);

export const customerSupport = createAsyncThunk(
  'login/customerSupport',
  async (_, { extra, getState, rejectWithValue }) => {
    try {
      const { API } = extra as ExtraArgument;
      const { login } = getState() as any;
      const { message: reason } = login.postLoginError;
      const { accountDetails } = getAccountDetails();

      // API request payload options
      const options = {
        apiPath: 'CUSTOMER_SUPPORT.POST',
        data: {
          [onlyNumbers(accountDetails.emailMobileDetails) ? 'mobile' : 'email']:
            accountDetails.emailMobileDetails,
          reason,
        },
      };

      const { data: data } = await API.request(options);
      const { data: body } = data;

      if (data.error) {
        const { message } = data.error;
        return rejectWithValue({
          error: { message },
        });
      }

      return body;
    } catch (e: any) {
      return rejectWithValue({
        error: { ...e?.error, isDispatch: false },
      });
    }
  }
);
