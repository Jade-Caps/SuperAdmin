// src/api/log/logSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';
import { showError } from '../../utils/toastMessage'; // optional: for toast error

// Fetch tenant logs (only for superadmin)
export const fetchLogs = createAsyncThunk(
  'logs/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/superadmin/logs');
      return res.data;
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch logs');
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch logs');
    }
  }
);

const logSlice = createSlice({
  name: 'logs',
  initialState: {
    loading: false,
    error: null,
    data: [] // store logs here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default logSlice.reducer;
