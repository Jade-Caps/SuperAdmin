// src/pages/Dashboard/DashboardContainer.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard.component';
import { fetchProfile } from '../../api/tenantProfile/profileSlice';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { data: profileData, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profileData) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileData]);

  const tenantId = profileData?.name || 'defaultTenantId';

  return <Dashboard tenantId={tenantId} loading={loading} error={error} />;
};

export default DashboardContainer;
