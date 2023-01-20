import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HttpClient } from '../..';

export interface UserState {
  loading: boolean;
  users: string[];
  error: string;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: '',
};

const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  // need to pass type for params (object, string, number, array or any) according to dispatched payload
  async (params: { name: string; id: number }, { extra }) => {
    const { API } = extra as { API: HttpClient };
    // destructure parama and use accordingly
    const { name, id } = params;
    console.log(name, id);
    const options = {
      apiPath: 'USER.GET',
    };
    try {
      const { data: data } = await API.request(options);
      return data.map((user: { id: string }) => user.id);
    } catch (e) {
      return { error: e };
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<string[]>) => {
      (state.loading = false), (state.users = action.payload), (state.error = '');
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.loading = false),
        (state.users = []),
        (state.error = action.error.message || 'Something went wrong. Please retry.');
    });
  },
});

export { fetchUsers };
export default userSlice.reducer;
