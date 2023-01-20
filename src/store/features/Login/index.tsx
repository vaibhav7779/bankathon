import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from 'constants/storage';
import { removeLocalStorage } from 'GlobalUtils';
import {
  postLoginCheckType,
  setEmailMobileType,
  setForgotCreateType,
  setGenerateOtpType,
  setUsernameType,
  setValidateOtpType,
} from './Login.type';

import {
  forgotUsername,
  forgotPassword,
  generateOtp,
  setEmailMob,
  setUserName,
  validateOtp,
  validateUser,
  createUsername,
  unlockAccount,
  validateForgotOtp,
  postLoginCheck,
} from './Login.utils';

export interface loginState {
  loading: boolean;
  loginDetails: {
    emailMob: string;
    userPan: string;
    userName: string;
  };
  otpGenerate: { refId: string; mobileNumber: string };
  otpValidate: { token: string; lastLoggedInAt: string; name: string; userId: string };
  forgotCreateDetails: { refId: string; mobile?: string; email?: string };
  postLoginCheck: { redirectionUrl: string };
  error: { code: number; message: string; isDispatch: boolean };
  postLoginError: { code: number; message: string; isDispatch: boolean };
}

const initialState: loginState = {
  loading: false,
  loginDetails: { emailMob: '', userPan: '', userName: '' },
  otpGenerate: { refId: '', mobileNumber: '' },
  otpValidate: { token: '', lastLoggedInAt: '', name: '', userId: '' },
  forgotCreateDetails: { refId: '' },
  postLoginCheck: { redirectionUrl: '' },
  error: { code: 0, message: '', isDispatch: true },
  postLoginError: { code: 0, message: '', isDispatch: true },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    removeUser: (state) => {
      (state.loginDetails = { emailMob: '', userPan: '', userName: '' }),
        removeLocalStorage(LOCAL_STORAGE_KEY);
    },
    removeError: (state) => {
      state.error = { code: 0, message: '', isDispatch: true };
    },
    removePostLoginError: (state) => {
      state.postLoginError = { code: 0, message: '', isDispatch: true };
    },
  },
  extraReducers: (builder) => {
    // Set email/mobile
    builder.addCase(setEmailMob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setEmailMob.fulfilled, (state, action: PayloadAction<setEmailMobileType>) => {
      (state.loading = false),
        (state.loginDetails.emailMob = action.payload?.email || action.payload?.mobile),
        (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(setEmailMob.rejected, (state, action: any) => {
      (state.loading = false),
        (state.loginDetails.emailMob = ''),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // Set username
    builder.addCase(setUserName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setUserName.fulfilled, (state, action: PayloadAction<setUsernameType>) => {
      (state.loading = false),
        (state.loginDetails.userName = action.payload?.username),
        (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(setUserName.rejected, (state, action: any) => {
      (state.loading = false),
        (state.loginDetails.emailMob = ''),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // validateUser
    builder.addCase(validateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateUser.fulfilled, (state, action: any) => {
      (state.loading = false),
        (state.loginDetails.emailMob = action.payload?.emailMobile),
        (state.loginDetails.userPan = action.payload?.userPan),
        (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(validateUser.rejected, (state, action: any) => {
      (state.loading = false),
        (state.loginDetails.emailMob = ''),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // generate Otp
    builder.addCase(generateOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateOtp.fulfilled, (state, action: PayloadAction<setGenerateOtpType>) => {
      (state.loading = false),
        (state.otpGenerate.refId = action.payload?.refId),
        (state.otpGenerate.mobileNumber = action.payload?.mobileNumber),
        (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(generateOtp.rejected, (state, action: any) => {
      (state.loading = false),
        (state.otpGenerate = { refId: '', mobileNumber: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // validate Otp
    builder.addCase(validateOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateOtp.fulfilled, (state, action: PayloadAction<setValidateOtpType>) => {
      (state.loading = false),
        (state.otpValidate.token = action.payload?.accessToken),
        (state.otpValidate.lastLoggedInAt = action.payload?.lastLoggedInAt),
        (state.otpValidate.name = action.payload?.name),
        (state.otpValidate.userId = action.payload?.userId),
        (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(validateOtp.rejected, (state, action: any) => {
      (state.loading = false),
        (state.otpValidate = { token: '', lastLoggedInAt: '', name: '', userId: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // validate Otp
    builder.addCase(validateForgotOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateForgotOtp.fulfilled, (state) => {
      (state.loading = false), (state.error = { code: 0, message: '', isDispatch: true });
    });
    builder.addCase(validateForgotOtp.rejected, (state, action: any) => {
      (state.loading = false),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      forgotPassword.fulfilled,
      (state, action: PayloadAction<setForgotCreateType>) => {
        (state.loading = false),
          (state.forgotCreateDetails.refId = action.payload?.refId),
          (state.forgotCreateDetails.email = action.payload?.email),
          (state.forgotCreateDetails.mobile = action.payload?.mobile),
          (state.loginDetails.userPan = action.payload?.pan || ''),
          (state.loginDetails.emailMob = action.payload?.email || action.payload?.mobile || ''),
          (state.error = { code: 0, message: '', isDispatch: true });
      }
    );
    builder.addCase(forgotPassword.rejected, (state, action: any) => {
      (state.loading = false),
        (state.forgotCreateDetails = { refId: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // forgot Password
    builder.addCase(forgotUsername.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      forgotUsername.fulfilled,
      (state, action: PayloadAction<setForgotCreateType>) => {
        (state.loading = false),
          (state.forgotCreateDetails.refId = action.payload?.refId),
          (state.forgotCreateDetails.email = action.payload?.email),
          (state.forgotCreateDetails.mobile = action.payload?.mobile),
          (state.loginDetails.userPan = action.payload?.pan || ''),
          (state.error = { code: 0, message: '', isDispatch: true });
      }
    );
    builder.addCase(forgotUsername.rejected, (state, action: any) => {
      (state.loading = false),
        (state.forgotCreateDetails = { refId: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // create Username
    builder.addCase(createUsername.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createUsername.fulfilled,
      (state, action: PayloadAction<setForgotCreateType>) => {
        (state.loading = false),
          (state.forgotCreateDetails.refId = action.payload?.refId),
          (state.forgotCreateDetails.email = action.payload?.email),
          (state.forgotCreateDetails.mobile = action.payload?.mobile),
          (state.loginDetails.userPan = action.payload?.pan || ''),
          (state.loginDetails.emailMob = action.payload?.emailMobile || ''),
          (state.error = { code: 0, message: '', isDispatch: true });
      }
    );
    builder.addCase(createUsername.rejected, (state, action: any) => {
      (state.loading = false),
        (state.forgotCreateDetails = { refId: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // create unlock account
    builder.addCase(unlockAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      unlockAccount.fulfilled,
      (state, action: PayloadAction<setForgotCreateType>) => {
        (state.loading = false),
          (state.forgotCreateDetails.refId = action.payload?.refId),
          (state.forgotCreateDetails.email = action.payload?.email),
          (state.forgotCreateDetails.mobile = action.payload?.mobile),
          (state.loginDetails.userPan = action.payload?.pan || ''),
          (state.loginDetails.emailMob = action.payload?.emailMobile || ''),
          (state.error = { code: 0, message: '', isDispatch: true });
      }
    );
    builder.addCase(unlockAccount.rejected, (state, action: any) => {
      (state.loading = false),
        (state.forgotCreateDetails = { refId: '' }),
        (state.error = action.payload.error || 'Something went wrong. Please retry.');
    });

    // postLoginCheck
    builder.addCase(postLoginCheck.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      postLoginCheck.fulfilled,
      (state, action: PayloadAction<postLoginCheckType>) => {
        (state.loading = false),
          (state.postLoginCheck.redirectionUrl = action.payload.postLoginCheck),
          (state.error = { code: 0, message: '', isDispatch: false });
      }
    );
    builder.addCase(postLoginCheck.rejected, (state, action: any) => {
      console.log(action),
        (state.loading = false),
        (state.postLoginError = action.payload.error || 'Something went wrong. Please retry.');
    });
  },
});

// Action creators are generated for each case reducer function
export const { removeUser, removeError, removePostLoginError } = loginSlice.actions;
export default loginSlice.reducer;
