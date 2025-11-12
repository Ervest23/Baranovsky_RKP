import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const accounts = [
  { username: 'slava', password: '1111' },
  { username: 'ilya', password: '1111' },
  { username: 'maxim', password: '1111' },
  { username: 'artur', password: '1111' }
];

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = accounts.find(acc => 
        acc.username === username && acc.password === password
      );

      if (user) {
        return { username: user.username };
      } else {
        return rejectWithValue('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      return rejectWithValue('Ошибка сервера');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;