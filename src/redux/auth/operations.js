import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstans = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

export const setToken = (token) => {
  authInstans.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstans.defaults.headers.common.Authorization = '';
};

export const apiRegisterUser = createAsyncThunk(
  'auth/registeUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstans.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstans.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue(
        'No token provided to refresh user token'
      );
    }

    try {
      setToken(token);
      const { data } = await authInstans.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogOutUser = createAsyncThunk(
  'auth/logOutnUser',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstans.post('/users/logout');
      clearToken();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
