// src/pages/Dashboard/Dashboard.component.jsx
import React from 'react';
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

const Dashboard = ({ tenantId, loading, error }) => {
  const theme = useTheme();

  const ADMIN_PORTAL_URL = import.meta.env.VITE_ADMIN_PORTAL_URL;
  const OWNER_PORTAL_URL = import.meta.env.VITE_OWNER_PORTAL_URL;

  const portals = [
    {
      title: 'Admin Portal',
      description: 'Manage properties, bookings, and users',
      link: `${ADMIN_PORTAL_URL}/${tenantId}/login`,
    },
    {
      title: 'Owner Portal',
      description: 'View your property listings and details',
      link: `${OWNER_PORTAL_URL}/${tenantId}/login`,
    },
  ];

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 6 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

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
        sx={{ color: theme.palette.text.dark, textAlign: 'center' }}
      >
        User Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={2}>
        {portals.map((portal) => (
          <Grid item xs={12} sm={6} md={4} key={portal.title}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: theme.palette.background.dark,
                color: theme.palette.text.primary,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {portal.title}
                </Typography>
                <Typography variant="body2" >
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
