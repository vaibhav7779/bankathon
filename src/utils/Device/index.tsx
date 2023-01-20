import Bowser from 'bowser';
import { LOCAL_STORAGE_UUID } from 'constants/storage';
import { getLocalStorage } from 'GlobalUtils';

export type BrowserInfoType = {
  deviceId?: string;
  browser?: string;
  os?: string;
  type?: string;
  browserVersion?: string;
  osVersion?: string;
  locationAccess?: boolean;
  message?: string;
  error?: boolean;
};

export const fetchBrowserLocation = async () => {
  try {
    const position: GeolocationPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { coords } = position;
    const { latitude, longitude } = coords;
    return { latitude, longitude };
  } catch (e) {
    return { error: 'Fetch device location failed' };
  }
};

export const fetchDeviceDetails = () => {
  const { navigator: { userAgent } = {} } = window;
  let browserInfo = {
    message: 'Cannot find userAgent',
    error: false,
  } as BrowserInfoType;
  if (userAgent) {
    const browserDetails = Bowser.parse(userAgent);
    const { browser, os } = browserDetails;
    const { name: browserName, version: browserVersion } = browser;

    const { name: osName, version: osVersion } = os;
    const deviceId = getLocalStorage(LOCAL_STORAGE_UUID) as string;
    browserInfo = {
      deviceId,
      browser: browserName,
      os: osName,
      browserVersion,
      osVersion,
    };
  } else {
    return { error: 'Fetch Device Info failed' };
  }
  return browserInfo;
};
