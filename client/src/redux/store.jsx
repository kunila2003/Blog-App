import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: !!localStorage.getItem('userId'), // Initialize based on localStorage
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem('isLogin', true);
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem('userId');
      localStorage.setItem('isLogin', false);
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
