import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminProfile from './Profile.component';
import { fetchAdminProfile, updateAdminProfile } from '../../api/adminProfile/profileSlice';

const AdminProfileContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.adminProfile);

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  const handleSubmit = (formValues) => {
    dispatch(updateAdminProfile(formValues));
  };

  return <AdminProfile data={data} loading={loading} error={error} onSubmit={handleSubmit} />;
};

export default AdminProfileContainer;
