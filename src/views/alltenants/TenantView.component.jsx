import React from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Grid,
  Button,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const TenantView = ({ tenant, loading, error }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!tenant) return null;

  return (
    <Box p={3}>
      {/* Back Button */}
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="whiteOutlined"
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.dark, textAlign: "center" }}>
        User Details
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: theme.palette.background.light,
          color: theme.palette.text.dark,
          // borderRadius: 3,
        }}
      >
        {/* Header Section */}
        <Stack spacing={2} alignItems="center" mb={3}>
          <Box
            sx={{
              // width: 120,
              height: 120,
              // borderRadius: '50%',
              overflow: 'hidden',
              // border: '2px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#fff',
            }}
          >
            <img
              src={tenant.logoURL}
              alt={tenant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'center',
              }}
             
            />
          </Box>


          <Typography variant="h6">{tenant.name}</Typography>
          <Typography>{tenant.email}</Typography>
          <Typography>Phone: {tenant.phone || '-'}</Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Personal Info */}
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Company</Typography>
            <Typography>{tenant.companyName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle1">Designation</Typography>
            <Typography>{tenant.designation || '-'}</Typography>
          </Grid>
        </Grid>


        <Divider sx={{ my: 3 }} />

        {/* Address */}
        <Typography variant="subtitle1">Address</Typography>
        <Typography>
          {tenant.addressLine1}, {tenant.city}, {tenant.state} - {tenant.postalCode}, {tenant.country}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Subscription */}
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Plan</Typography>
            <Typography>{tenant.planType}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography>{tenant.subscriptionStatus}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Ends</Typography>
            <Typography>
              {tenant.subscriptionEndsAt
                ? new Date(tenant.subscriptionEndsAt).toLocaleDateString()
                : '-'}
            </Typography>
          </Grid>
        </Grid>

        {tenant.trialEndsAt && (
          <Box mt={1}>
            <Typography variant="subtitle2">Trial Ends:</Typography>
            <Typography>{new Date(tenant.trialEndsAt).toLocaleDateString()}</Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* DB Info */}
        <Typography variant="subtitle1">Database Info</Typography>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={6} sm={3}><Typography>Host: {tenant.dbHost}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>Port: {tenant.dbPort}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>Name: {tenant.dbName}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>User: {tenant.dbUser}</Typography></Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Audit Info */}
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Last Login:</Typography>
            <Typography>
              {tenant.lastLogin
                ? new Date(tenant.lastLogin).toLocaleString()
                : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Created At:</Typography>
            <Typography>
              {new Date(tenant.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TenantView;
