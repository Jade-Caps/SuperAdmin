import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

// Fetch Admin Profile
export const fetchAdminProfile = createAsyncThunk(
  'adminProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/superadmin/admins/profile');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch admin profile');
    }
  }
);

// Update Admin Profile
export const updateAdminProfile = createAsyncThunk(
  'adminProfile/update',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put('/superadmin/admins/profile', formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update admin profile');
    }
  }
);

// Slice
const adminProfileSlice = createSlice({
  name: 'adminProfile',
  initialState: {
    loading: false,
    error: null,
    data: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export default adminProfileSlice.reducer;
