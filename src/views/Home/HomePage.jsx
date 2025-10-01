import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Grid,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';

const HeroBox = styled(Box)(({ theme }) => ({
  background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230f2437' fill-opacity='0.03'/%3E%3C/svg%3E")`,
  backgroundColor: '#f7fafd',
  color: '#0f2437',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '80vh',
  padding: theme.spacing(8, 2),
  position: 'relative',
}));

const GlowingText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #0f2437, #7895b2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 2px 16px #7895b288)',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  borderRadius: 0,
  boxShadow: '0 6px 24px rgba(15,36,55,0.08)',
  border: '1px solid rgba(120,149,178,0.12)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 32px rgba(15,36,55,0.15)',
  },
}));

const portalFeatures = [
  {
    title: 'Admin Portal',
    description: 'Complete control and management system for property administrators',
    icon: <AdminPanelSettingsIcon fontSize="large" sx={{ color: '#0f2437' }} />,
    features: [
      'Multi-tenant Management',
      'User Access Control',
      'System Configuration',
      'Analytics Dashboard',
      'Billing Management',
      'Support Ticket System',
    ],
  },
  {
    title: 'Owner Portal',
    description: 'Comprehensive property management interface for property owners',
    icon: <BusinessIcon fontSize="large" sx={{ color: '#7895b2' }} />,
    features: [
      'Property Listings',
      'Booking Management',
      'Revenue Tracking',
      'Guest Communication',
      'Property Analytics',
      'Maintenance Requests',
    ],
  },
];

const coreFeatures = [
  {
    title: 'Property Management',
    description:
      'Comprehensive property listing and management system with detailed property profiles, amenities, and pricing management.',
    icon: <BusinessIcon fontSize="large" sx={{ color: '#0f2437' }} />,
  },
  {
    title: 'Booking Manager Across OTA',
    description:
      'Centralized booking management system that syncs with multiple Online Travel Agencies (OTAs) for maximum reach and efficiency.',
    icon: <RocketLaunchIcon fontSize="large" sx={{ color: '#7895b2' }} />,
  },
  {
    title: 'Booking Calendar Sync',
    description:
      'Real-time calendar synchronization across all platforms to prevent double bookings and maintain accurate availability.',
    icon: <CalendarMonthIcon fontSize="large" sx={{ color: '#0f2437' }} />,
  },
  {
    title: 'RazorPay Payment Integration',
    description:
      'Secure payment processing with RazorPay gateway supporting multiple payment methods and automated invoicing.',
    icon: <PaymentIcon fontSize="large" sx={{ color: '#7895b2' }} />,
  },
  {
    title: 'Isolated Database',
    description:
      'Each tenant gets a completely isolated database ensuring data security, privacy, and compliance with regulations.',
    icon: <SecurityIcon fontSize="large" sx={{ color: '#0f2437' }} />,
  },
  {
    title: 'Advanced Security',
    description:
      'Enterprise-grade security with encryption, role-based access control, and regular security audits.',
    icon: <SecurityIcon fontSize="large" sx={{ color: '#7895b2' }} />,
  },
  {
    title: 'Unified Inbox',
    description:
      'Centralized communication hub to chat with guests across all OTA platforms from a single interface.',
    icon: <ChatIcon fontSize="large" sx={{ color: '#0f2437' }} />,
  },
  {
    title: 'Task Manager',
    description:
      'Comprehensive task management system for property maintenance, guest requests, and operational workflows.',
    icon: <AssignmentIcon fontSize="large" sx={{ color: '#7895b2' }} />,
    comingSoon: true,
  },
  {
    title: 'Reports Generation',
    description:
      'Advanced reporting system with booking reports, property performance analytics, and financial insights.',
    icon: <AssessmentIcon fontSize="large" sx={{ color: '#0f2437' }} />,
  },
  {
    title: 'Dedicated Dashboard',
    description:
      'Customizable dashboard with real-time metrics, KPIs, and actionable insights for informed decision-making.',
    icon: <DashboardIcon fontSize="large" sx={{ color: '#7895b2' }} />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* Hero Section */}
      <HeroBox>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4.2rem' },
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-2px',
            }}
          >
            <GlowingText>Welcome to JadeCaps PMS</GlowingText>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#4a5a6a',
            }}
          >
            Professional Property Management System with Admin & Owner Portals.
            Streamline your operations with our comprehensive suite of tools.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              px: { xs: 6, md: 8 },
              py: { xs: 1.8, md: 2.2 },
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.2rem' },
              background: '#0f2437',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(15,36,55,0.2)',
              '&:hover': {
                background: '#7895b2',
                transform: 'translateY(-3px) scale(1.04)',
                boxShadow: '0 8px 24px rgba(15,36,55,0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </HeroBox>

      {/* Portal Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-1px', color: theme.palette.primary.main }}>
            We Are Offering Admin & Owner Portals
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: theme.palette.text.secondary }}>
            Two powerful portals designed for different user roles with comprehensive features and capabilities.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {portalFeatures.map((portal) => (
            <Grid item xs={12} md={6} key={portal.title}>
              <GlassCard>
                <CardContent sx={{ 
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {portal.icon}
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mt: 2 }}>
                      {portal.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                      {portal.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {portal.features.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(15,36,55,0.08)',
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Core Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-1px', color: theme.palette.primary.main }}>
            Comprehensive Feature Set
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: theme.palette.text.secondary }}>
            Everything you need to manage properties, bookings, and operations efficiently.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {coreFeatures.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <GlassCard>
                <CardContent sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {feature.comingSoon && (
                    <Chip
                      label="Coming Soon"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: '#f7b42c',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <Box>
                    <Box mb={2}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1.5 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Final CTA */}
      <Container maxWidth="md" sx={{ textAlign: 'center', pb: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 0,
            background: '#0f2437',
            color: '#fff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-1px' }}>
            Ready to Transform Your Property Management?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4, color: 'rgba(255,255,255,0.92)' }}>
            Join a growing community of property managers and owners who trust JadeCaps PMS for their operations.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              px: { xs: 6, md: 8 },
              py: { xs: 2, md: 2.5 },
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.2rem' },
              background: '#7895b2',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              '&:hover': {
                background: '#f7b42c',
                color: '#0f2437',
                transform: 'translateY(-3px) scale(1.04)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Your Free Trial
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
