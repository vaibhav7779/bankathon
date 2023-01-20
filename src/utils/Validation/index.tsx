import { primaryValidation } from 'Components/CredentialPolicy/CredentialPolicy.type';

export const emailValidation = (value: string) => {
  const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return regex.test(value);
};

export const mobileNumberValidation = (value: string) => {
  const regex = /^[6-9]\d{9}$/gi;
  return regex.test(value);
};

export const passwordValidation = (value: string) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  return regex.test(value);
};

export const panValidation = (value: string) => {
  const regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
  return regex.test(value);
};

export const sixTwelveChars = (value: string) => {
  const regex = /^[a-zA-z0-9@#$!_%&*-]{6,12}$/;
  return regex.test(value);
};

export const eightTwelveChars = (value: string) => {
  const regex = /^[a-zA-z0-9@#$!_%&*-]{8,12}$/;
  return regex.test(value);
};

export const oneDigit = (value: string) => {
  const regex = /\d/;
  return regex.test(value);
};

export const oneAlphabet = (value: string) => {
  const regex = /[a-zA-Z]/;
  return regex.test(value);
};

export const isEmpty = (value: string) => {
  const regex = /^$|\s+/;
  return regex.test(value);
};

export const onlyNumbers = (value: string) => {
  const regex = /^\d+$/;
  return regex.test(value);
};

export const repeatNumber = (value: string) => {
  const regex = /^(1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10}|0{10})$/;
  return regex.test(value);
};

export const passwordPolicy = (validationList: primaryValidation[]) => {
  const regexValidate = validationList.find((item) => item.regex === false);
  if (regexValidate) {
    return false;
  } else {
    return true;
  }
};

export const isValidUsername = (username: string) => {
  const regex = /^[a-zA-z0-9]*$/;
  return regex.test(username);
};
