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
import DashboardContainer from '../views/tenatdashboard/Dashboard.container';
import NotFound404 from '../views/NotFound/NotFound404';
import Home from '../views/Home/HomePage';
import { Public } from '@mui/icons-material';
import PublicRoute from './PublicRoutes';
import AdminDashboard from '../views/admindashboard/AdminDashboard.component';
import DocumentContainer from '../views/document/document.container';
import FeedbackListContainer from '../views/feedback/FeedbackList.container';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login" element={<PublicRoute>     <LoginContainer />   </PublicRoute>} />

      <Route path="/signup" element={<PublicRoute>     <SignupContainer />   </PublicRoute>} />
      <Route path="/profile/user" element={<ProtectedRoute>  <ProfileContainer /> </ProtectedRoute>} />
      <Route path="/profile/admin" element={<ProtectedRoute>  <AdminProfileContainer />  </ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute>  <TenantsContainer />  </ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute><TenantsContainer /></ProtectedRoute>} />
      <Route path="/roles" element={<ProtectedRoute ><RoleContainer /></ProtectedRoute>} />
      <Route path="/logs" element={<ProtectedRoute ><LogContainer /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardContainer /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/document" element={<ProtectedRoute><DocumentContainer /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><FeedbackListContainer /></ProtectedRoute>} />

      <Route path="*" element={<NotFound404 />} />







    </Routes>
  );
};

export default AppRoutes;
