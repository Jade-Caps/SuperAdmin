import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

// Fetch all feedback from all tenants
export const fetchAllFeedback = createAsyncThunk(
  'feedback/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Build query params
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.rating) queryParams.append('rating', filters.rating);
      if (filters.priority) queryParams.append('priority', filters.priority);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/superadmin/feedback?${queryString}` : '/superadmin/feedback';

      const res = await axios.get(url);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch feedback');
    }
  }
);

// Fetch feedback for a specific tenant
export const fetchFeedbackByTenant = createAsyncThunk(
  'feedback/fetchByTenant',
  async ({ tenantId, filters = {} }, { rejectWithValue }) => {
    try {
      // Build query params
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.rating) queryParams.append('rating', filters.rating);
      if (filters.priority) queryParams.append('priority', filters.priority);
      
      const queryString = queryParams.toString();
      const url = queryString 
        ? `/superadmin/feedback/tenant/${tenantId}?${queryString}` 
        : `/superadmin/feedback/tenant/${tenantId}`;

      const res = await axios.get(url);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tenant feedback');
    }
  }
);

// Update feedback response (add admin response, change status)
export const updateFeedbackResponse = createAsyncThunk(
  'feedback/updateResponse',
  async ({ tenantId, feedbackId, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/superadmin/feedback/tenant/${tenantId}/${feedbackId}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update feedback');
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentFeedback: null
  },
  reducers: {
    clearCurrentFeedback(state) {
      state.currentFeedback = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all feedback
      .addCase(fetchAllFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch feedback by tenant
      .addCase(fetchFeedbackByTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackByTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFeedbackByTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update feedback response
      .addCase(updateFeedbackResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeedbackResponse.fulfilled, (state, action) => {
        state.loading = false;
        // Update the feedback in the list
        const index = state.list.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateFeedbackResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentFeedback, clearError } = feedbackSlice.actions;

export default feedbackSlice.reducer;

