import { configureStore } from '@reduxjs/toolkit';

import API from 'Configurations/network/utils/httpClient';

import { BrowserInfoType, fetchDeviceDetails } from 'Utils/Device';

import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { API, DeviceInfo: fetchDeviceDetails() } },
      serializableCheck: false,
    }),
});

// Infer the HttpClient types from API
export type HttpClient = typeof API;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// extra argument type
export type ExtraArgument = { API: HttpClient; DeviceInfo: BrowserInfoType };
