// src/api/auth/verificationSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios';

export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async (email, { rejectWithValue }) => {
    try {
      // CORRECTED: Remove the extra '/api' prefix
      const response = await axios.post(
        '/superadmin/tenants/resend-verification', 
        { email }
      );
      return response.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to resend verification email.'
      );
    }
  }
);

const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    status: null,
    error: null,
    message: null,
  },
  reducers: {
    clearVerificationState: (state) => {
      state.status = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendVerification.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearVerificationState } = verificationSlice.actions;
export default verificationSlice.reducer;