import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile.component';
import { fetchProfile, updateProfile } from '../../api/tenantProfile/profileSlice';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSubmit = (formValues) => {
    dispatch(updateProfile(formValues));
  };

  return <Profile data={data} loading={loading} error={error} onSubmit={handleSubmit} />;
};

export default ProfileContainer;
