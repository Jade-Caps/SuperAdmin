// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../api/signup/signupSlice';
import verificationReducer from '../api/auth/verificationSlice';
import loginReducer from '../api/login/loginSlice'
import profileReducer from '../api/tenantProfile/profileSlice'
import adminProfileReducer from '../api/adminProfile/profileSlice'
import tenantsReducer from '../api/allTenants/tenantSlice'
import roleReducer from '../api/roles/roleSlice'
import logReducer from '../api/logs/logSlice'


export const store = configureStore({
  reducer: {
    signup: signupReducer, 
    verification: verificationReducer,
    login :loginReducer ,
    profile :profileReducer ,
    adminProfile : adminProfileReducer,
    tenants : tenantsReducer,
    roles :roleReducer,
    logs : logReducer
  },
});
