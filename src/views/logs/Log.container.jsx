// src/views/Log/Log.container.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../../api/logs/logSlice';
import LogComponent from './Log.component';

const LogContainer = () => {
  const dispatch = useDispatch();
  const { data: logs, loading, error } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  return (
    <LogComponent logs={logs} loading={loading} error={error} />
  );
};

export default LogContainer;
