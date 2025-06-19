import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

// Login API (Admin or Tenant)
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/superadmin/admins/login', formData);
      const userType = 'admin';
      const token = res.data.data.token;
      const payload = { ...res.data.data, userType };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(payload));
      localStorage.setItem('userType', userType);

      return payload;
    } catch (adminErr) {
      try {
        const res = await axios.post('/superadmin/tenants/login', formData);
        const userType = 'tenant';
        const token = res.data.data.token;
        const payload = { ...res.data.data, userType };

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('userType', userType);

        return payload;
      } catch (tenantErr) {
        return rejectWithValue(
          tenantErr.response?.data?.message ||
            adminErr.response?.data?.message ||
            'Login failed. Please check your credentials.'
        );
      }
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    userType: localStorage.getItem('userType') || null,
    isLoggedIn: !!localStorage.getItem('authToken'),
    error: null
  },
  reducers: {
    clearLoginState: (state) => {
      state.loading = false;
      state.user = null;
      state.userType = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userType = action.payload.userType;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  }
});

export const { clearLoginState } = loginSlice.actions;
export default loginSlice.reducer;
