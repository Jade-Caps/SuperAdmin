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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes, styled } from '@mui/system';

// 🔵 Subtle gradient animation for Hero
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// 🔵 Styled Hero section
const HeroBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 20s ease infinite`,
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '80vh',
  padding: theme.spacing(8, 2),
}));

const features = [
  {
    title: 'Multi-Tenant Architecture',
    description:
      'Each owner gets an isolated, secure database. The Super Admin manages everything centrally with full control.',
  },
  {
    title: 'Owner & Guest Portals',
    description:
      'Intuitive portals for owners to handle listings & bookings. Guests get smooth direct booking with live availability.',
  },
  {
    title: 'Real-Time Sync',
    description:
      'Keep reservations, payments & listings instantly up-to-date across all channels, boosting occupancy & saving time.',
  },
  {
    title: 'Advanced Reporting',
    description:
      'Detailed dashboards & custom reports for smart, data-driven decisions to optimize your revenue & operations.',
  },
  {
    title: 'Secure Payments',
    description:
      'Robust payment gateways for safe transactions. Support multiple methods with top-notch encryption.',
  },
  {
    title: '24/7 Support',
    description:
      'Round-the-clock assistance plus regular updates so your system stays cutting-edge and reliable.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* ✅ Hero Section */}
      <HeroBox>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Welcome to{' '}
            <Box component="span" sx={{ color: theme.palette.warning.main }}>
              JadeCaps PMS
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            The secure, scalable Property Management System built for owners,
            managers, and guests. Effortless, efficient, and easy to use.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              px: { xs: 6, md: 8 },
              py: { xs: 1.8, md: 2.2 },
              borderRadius: theme.shape.borderRadius * 2.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.2rem' },
              backgroundColor: theme.palette.warning.main,
              '&:hover': {
                backgroundColor: theme.palette.warning.dark,
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </HeroBox>

      {/* ✅ Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Powerful Features to Elevate Your Business
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: theme.palette.text.secondary }}>
            From secure multi-tenancy to real-time sync — JadeCaps PMS gives you
            everything to run a modern property operation.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {features.map((feature, idx) => (
            <Card
              key={idx}
              sx={{
                borderRadius: theme.shape.borderRadius * 2,
                boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1.5,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* ✅ Final CTA */}
      <Container maxWidth="md" sx={{ textAlign: 'center', pb: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: theme.shape.borderRadius * 2,
            background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: theme.palette.common.white,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Unlock Next-Level Operations?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Join a growing community of owners and managers transforming their
            workflows with JadeCaps PMS.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              px: { xs: 6, md: 8 },
              py: { xs: 2, md: 2.5 },
              borderRadius: theme.shape.borderRadius * 2.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.2rem' },
              backgroundColor: theme.palette.warning.main,
              '&:hover': {
                backgroundColor: theme.palette.warning.dark,
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Try JadeCaps Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
