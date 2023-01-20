/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Aes, AesUtils, Pgp } from '@m92/crypto';

const crypto = {
  encrypt,
  decrypt,
};

export default crypto;

async function encrypt(algorithm: any, payload: any, keyData: any, options = {}) {
  switch (algorithm) {
    case 'aes-256-gcm': {
      const encryptedData = await _aes256Encryptor(payload, keyData, options);
      return encryptedData;
    }
    case 'pgp': {
      const encryptedData = await _pgpEncryptor(payload, keyData);
      return encryptedData;
    }
    default:
      return payload;
  }
}

async function decrypt(algorithm: any, payload: any, keyData: any) {
  switch (algorithm) {
    case 'aes-256-gcm': {
      const decryptedData = await _aes256Decryptor(payload, keyData);
      return decryptedData;
    }
    default:
      return payload;
  }
}

async function _aes256Encryptor(body: any, keyData: any, options: any) {
  const { token } = keyData;
  const encryptionKey = AesUtils.extractKeyFromToken(token);
  const bodyString = JSON.stringify(body);
  const encryptParams = {
    key: encryptionKey,
    data: bodyString,
  };
  const encryptedDataObj = Aes.encrypt('aes-256-gcm', encryptParams, options);
  const { payload } = encryptedDataObj;
  const encryptedBody = { payload };
  return encryptedBody;
}

async function _aes256Decryptor(body: any, keyData: any) {
  const { token } = keyData;
  const { data } = body;
  if (!token) {
    return body;
  }
  const decryptionKey = AesUtils.extractKeyFromToken(token);
  const { payload = '' } = data;
  const decryptParams = { key: decryptionKey, payload };
  const decryptedDataObj = Aes.decrypt('aes-256-gcm', decryptParams);
  const { data: decryptedDataString } = decryptedDataObj;
  const decryptedData = JSON.parse(decryptedDataString);
  return decryptedData;
}

async function _pgpEncryptor(body: any, keyData: any) {
  const { pgpPublicKey: publicKeyArmored, pgpPassphrase: passphrase, pgpUserId: userIds } = keyData;
  const params = {
    data: body,
    publicKeyArmored,
    passphrase,
    userIds,
  };

  const encrptedBody = await Pgp.encrypt(params);
  return encrptedBody;
}
