// src/pages/Log/components/table.jsx
import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer
} from '@mui/material';

const LogTable = ({ logs }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Email</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Tenant ID</TableCell>
            <TableCell>IP Address</TableCell>
            {/* <TableCell>User Agent</TableCell> */}
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.userEmail}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.tenantId}</TableCell>
              <TableCell>{log.ipAddress}</TableCell>
              {/* <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {log.userAgent}
              </TableCell> */}
              <TableCell>{new Date(log.loggedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogTable;
