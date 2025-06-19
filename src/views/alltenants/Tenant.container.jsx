import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenants, fetchTenantById } from '../../api/allTenants/tenantSlice';
import { useParams } from 'react-router-dom';
import TenantsListComponent from './TenantList.component';
import TenantView from './TenantView.component'; // path based on your structure

const TenantsContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // ID will be present in view page only

  const { list: tenants = [], selected, loading, error } = useSelector((state) => state.tenants || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchTenantById(id));
    } else {
      dispatch(fetchTenants());
    }
  }, [dispatch, id]);

  if (id) {
    return (
      <TenantView
        tenant={selected}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <TenantsListComponent
      tenants={Array.isArray(tenants) ? tenants : []}
      loading={loading}
      error={error}
    />
  );
};

export default TenantsContainer;
