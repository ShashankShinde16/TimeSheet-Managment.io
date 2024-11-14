// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: localStorage.getItem('userName') || null,
  id: localStorage.getItem('userId') || null,
  role: localStorage.getItem('role') || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  token: localStorage.getItem('authToken') || null,
  showToast: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_Role(state, action) {
      localStorage.setItem("role", action.payload);
      state.role = action.payload;
    },
    SET_JwtToken(state, action) {
      localStorage.setItem("authToken", action.payload);
      state.token = action.payload;
    },
    setShowToast(state, action) {
      state.showToast = action.payload;
    },
    login(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isLoggedIn = true;

      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userId', action.payload.id);
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout(state) {
      state.name = null;
      state.id = null;
      state.isLoggedIn = false;

      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
    }
  }
});


// Export actions to use in components
export const { SET_Role, SET_JwtToken, setShowToast, login, logout } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectId = (state) => state.user.id;
export const selectRole = (state) => state.user.role;
export const selectToken = (state) => state.user.token;
export const selectShowToast = (state) => state.user.showToast;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// Export the reducer to be used in the store
export default userSlice.reducer;
