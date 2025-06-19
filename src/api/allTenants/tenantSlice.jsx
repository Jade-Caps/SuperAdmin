// src/api/tenants/tenantsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

// Fetch all tenants
export const fetchTenants = createAsyncThunk(
  'tenants/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/superadmin/admins/tenants'); // endpoint for all tenants
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tenants');
    }
  }
);

// Fetch a single tenant by ID
export const fetchTenantById = createAsyncThunk(
  'tenants/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/superadmin/admins/tenants/${id}`); // endpoint for tenant by ID
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tenant details');
    }
  }
);

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState: {
    loading: false,
    error: null,
    list: [],
    selected: null
  },
  reducers: {
    clearSelectedTenant(state) {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchTenantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchTenantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedTenant } = tenantsSlice.actions;
export default tenantsSlice.reducer;
