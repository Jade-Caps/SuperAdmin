import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleComponent from './Role.component';
import { fetchRoles, createRole } from '../../api/roles/roleSlice';

const RoleContainer = () => {
  const dispatch = useDispatch();
   
  const { list, loading, error } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSubmit = (formValues) => {
    dispatch(createRole(formValues));
  };

  return (
    <RoleComponent
      roles={list}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default RoleContainer;
