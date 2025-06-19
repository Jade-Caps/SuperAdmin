// src/api/signup/signupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios'; 

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/superadmin/tenants/register', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Signup failed. Please try again.'
      );
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    user: null,
    error: null,
    successMessage: null
  },
  reducers: {
    clearSignupState: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSignupState } = signupSlice.actions;
export default signupSlice.reducer;
