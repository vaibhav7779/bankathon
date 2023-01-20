import { getLocalStorage } from 'GlobalUtils';

export const LOCAL_STORAGE_KEY = 'data';
export const LOCAL_STORAGE_UUID = 'uuid';

export const getAccountDetails = () => {
  const { accountName, accountDetails, loginType } = (getLocalStorage(LOCAL_STORAGE_KEY) as {
    accountName: string;
    accountDetails: { emailMobileDetails: string; usernameDetails: string };
    loginType: string;
  }) || {
    accountName: '',
    loginType: '',
    accountDetails: {
      emailMobileDetails: '',
      usernameDetails: '',
    },
  };

  return { accountName, accountDetails, loginType };
};
