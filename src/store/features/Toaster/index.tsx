import { createSlice } from '@reduxjs/toolkit';

export declare type ToasterStatus = 'error' | 'info' | 'warning' | 'success';
export interface ToasterState {
  toaster: { message: string };
}

const initialState: ToasterState = {
  toaster: { message: '' },
};

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    toaster: (state, action) => {
      state.toaster.message = action?.payload.message;
    },
  },
});

export const { toaster } = toasterSlice.actions;

export default toasterSlice.reducer;
