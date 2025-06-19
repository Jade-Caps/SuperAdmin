// src/routes/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

import SignupContainer from '../views/signup/Signup.container';
import LoginContainer from '../views/login/Login.container';

import ProfileContainer from '../views/tenantProfile/Profile.container';
import AdminProfileContainer from '../views/adminProfile/Profile.container';
import TenantsContainer from '../views/alltenants/Tenant.container';

import RoleContainer from '../views/roles/Role.container';
import LogContainer from '../views/logs/Log.container';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/profile/user" element={<ProtectedRoute>  <ProfileContainer /> </ProtectedRoute>} />
      <Route path="/profile/admin" element={<ProtectedRoute>  <AdminProfileContainer />  </ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute>  <TenantsContainer />  </ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute><TenantsContainer /></ProtectedRoute>} />
      <Route path ="/roles" element={<ProtectedRoute ><RoleContainer /></ProtectedRoute>} />
      <Route path ="/logs" element={<ProtectedRoute ><LogContainer /></ProtectedRoute>} />







    </Routes>
  );
};

export default AppRoutes;
