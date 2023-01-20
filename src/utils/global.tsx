import { v5 as uuid } from 'uuid';
import ls from 'localstorage-slim';
import { onlyNumbers } from './Validation';

ls.config.encrypt = true;

export const isAuthenticated = () => true;

export const UUIDGenerator = (name: string) => {
  const nameSpace = '57e9fe74-3d60-11ed-aa61-1359468a0d29';
  return uuid(name, nameSpace);
};

export const setLocalStorage = (key: string, value: any) => {
  ls.set(key, value, { secret: 12 });
};

export const getLocalStorage = (key: string) => {
  return ls.get(key, { secret: 12 });
};

export const removeLocalStorage = (key: string) => {
  ls.remove(key);
};

export const hiddenText = (value: string, pageState: { subHeading: string }) => {
  const emailAddress = value.split('@')[0];
  const emailAddressType = value.split('@')[1];

  return {
    ...pageState,
    subHeading:
      pageState.subHeading +
      ' ' +
      (onlyNumbers(value)
        ? value.slice(-4).padStart(10, '*')
        : emailAddress.charAt(0) +
          '*****' +
          emailAddress.charAt(emailAddress.length - 1) +
          '@' +
          emailAddressType),
  };
};
