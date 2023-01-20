/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpClientCreate from './httpClientCreator';
import HTTP_CLIENT_CONFIG from '../config/httpClient';
import DEFAULT_CONSTANTS from '../../../constants/network';

const client = HttpClientCreate(HTTP_CLIENT_CONFIG, DEFAULT_CONSTANTS);
const API = new client();
export default API;
