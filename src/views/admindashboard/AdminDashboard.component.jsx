import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const dummyStats = [
  { label: 'Total Tenants', value: 42 },
  { label: 'Active Users', value: 128 },
  { label: 'Monthly Revenue', value: '$12,500' },
  { label: 'Pending Approvals', value: 5 },
  { label: 'System Uptime', value: '99.99%' },
];

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userType = useSelector((state) => state.login.userType);

  useEffect(() => {
    if (userType !== 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [userType, navigate]);

  if (userType !== 'admin') return null;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        py: 6,
        px: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.palette.primary.main, textAlign: 'center' }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={2}>
        {dummyStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Card sx={{ maxWidth: 500, mx: 'auto', backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Add Tenant
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" color="primary" fullWidth>
                  View Logs
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;