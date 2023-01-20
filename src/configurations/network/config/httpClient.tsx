import API_ROUTES from '../apiRoutes';

const { API_KEY } = process.env;

// const CRPTOGRAPHY_DISABLED = DISABLE_CRPTOGRAPHY.trim().toLowerCase() === 'true';

const HTTP_CLIENT_CONFIG = {
  DISABLE_CRPTOGRAPHY: true,
  API_KEY,
  API_ROUTES,
};

export default HTTP_CLIENT_CONFIG;
