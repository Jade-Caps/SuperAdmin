import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TenantView = ({ tenant, loading, error }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!tenant) return null;

  return (
    <Box
      sx={{
        background: '#f9f9f9',
        minHeight: '100vh',
        p: { xs: 2, md: 4 },
      }}
    >
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="whiteOutlined"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <Stack spacing={2} alignItems="center">
              {tenant.logoURL ? (
                <Avatar
                  src={tenant.logoURL}
                  alt={tenant.name}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar sx={{ width: 100, height: 100, fontSize: 40 }}>
                  {tenant.name ? tenant.name.charAt(0).toUpperCase() : '?'}
                </Avatar>
              )}
              <Typography variant="h6" fontWeight={600}>
                {tenant.name}
              </Typography>
              <Typography variant="body2">{tenant.email}</Typography>
              <Typography variant="body2">
                Phone: {tenant.phone || '-'}
              </Typography>
            </Stack>
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Company Details">
            <InfoRow label="Company" value={tenant.companyName} />
            <InfoRow label="Designation" value={tenant.designation} />
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Address">
            <Typography variant="body2">
              {tenant.addressLine1}, {tenant.city}, {tenant.state} -{' '}
              {tenant.postalCode}, {tenant.country}
            </Typography>
             <InfoCard title="Database Info">
           
            <InfoRow label="Name" value={tenant.dbName} />
            
          </InfoCard>
          </InfoCard>
         
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Subscription">
            <InfoRow label="Plan" value={tenant.planType} />
            <InfoRow label="Status" value={tenant.subscriptionStatus} />
            <InfoRow
              label="Ends"
              value={
                tenant.subscriptionEndsAt
                  ? new Date(tenant.subscriptionEndsAt).toLocaleDateString()
                  : '-'
              }
            />
            {tenant.trialEndsAt && (
              <InfoRow
                label="Trial Ends"
                value={new Date(tenant.trialEndsAt).toLocaleDateString()}
              />
            )}
          </InfoCard>
        </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Database Info">
           
            <InfoRow label="Name" value={tenant.dbName} />
            
          </InfoCard>
        </Grid> */}

        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Audit Info">
            <InfoRow
              label="Last Login"
              value={
                tenant.lastLogin
                  ? new Date(tenant.lastLogin).toLocaleString()
                  : '-'
              }
            />
            <InfoRow
              label="Created At"
              value={new Date(tenant.createdAt).toLocaleString()}
            />
          </InfoCard>
        </Grid>
      </Grid>

      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </Box>
  );
};

// ✅ Reusable InfoCard
const InfoCard = ({ children, title }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        height: '100%',
        background: theme.palette.background.main,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
      }}
    >
      {title && (
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

// ✅ Reusable InfoRow
const InfoRow = ({ label, value }) => (
  <Box>
    <Typography
      variant="caption"
      sx={{ display: 'block', opacity: 0.7, mb: 0.5 }}
    >
      {label}
    </Typography>
    <Typography variant="body2">{value || '-'}</Typography>
  </Box>
);

export default TenantView;
