// src/views/admindashboard/AdminDashboard.component.jsx
import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ tenantId, loading, error }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userType = useSelector((state) => state.login.userType);

  useEffect(() => {
    if (userType === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [userType, navigate]);

  if (userType !== 'tenant') return null;

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 6 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  const portals = [
    {
      title: 'Admin Portal',
      description: 'Manage properties, bookings, and users',
      link: `#`,
    },
    {
      title: 'Owner Portal',
      description: 'View your property listings and details',
      link: `#`,
    },
  ];

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
        sx={{ color: theme.palette.primary.main, textAlign: 'center', fontWeight: 700 }}
      >
        User Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={2}>
        {portals.map((portal) => (
          <Grid item xs={12} sm={6} md={4} key={portal.title}>
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
                <Typography variant="h6" gutterBottom>
                  {portal.title}
                </Typography>
                <Typography variant="body2">
                  {portal.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => window.open(portal.link, '_blank')}
                >
                  Open {portal.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
