import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import setThemeColor from '../../utils/setThemeColor';
import { getItem, removeItem, setItem } from '../../utils/storage';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  token: string;
  avatar: string;
};

type AuthState = {
  user: User | null;
  theme: null;
  systemConfig: null;
};

function getUser() {
  const user = getItem<any>('USER');
  return user;
}

function getTheme() {
  const theme = getItem<any>('THEME');
  if (theme) {
    setThemeColor(theme);
  }
  return theme;
}

const initialState: AuthState = {
  user: getUser(),
  theme: getTheme(),
  systemConfig: getItem<any>('SYSTEM_CONFIG'),
};

export const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setItem('USER', action.payload);
    },
    logout: (state) => {
      state.user = null;
      removeItem('USER');
    },
    setTheme: (state, action: PayloadAction<any>) => {
      state.theme = action.payload;
      setThemeColor(action.payload);
      setItem('THEME', state.theme);
    },
  },
});

export const { login, logout, setTheme } = authStateSlice.actions;

export default authStateSlice.reducer;
