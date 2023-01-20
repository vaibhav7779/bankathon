import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from './features/EgCounter';
import userReducer from './features/EgUserThunk';
import loginReducer from './features/Login';
import toasterReducer from './features/Toaster';

export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  login: loginReducer,
  toast: toasterReducer,
});
