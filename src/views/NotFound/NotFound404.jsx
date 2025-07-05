import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: theme => theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        overflow: 'hidden',
      }}
    >
      {/* Subtle wave background */}
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '30%',
        }}
      >
        <path
          fill="#214FC6"
          fillOpacity="0.05"
          d="M0,128L48,128C96,128,192,128,288,133.3C384,139,480,149,576,154.7C672,160,768,160,864,165.3C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
          borderRadius: 4,
          p: 6,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '5rem', md: '7rem' },
            fontWeight: 800,
            color: theme => theme.palette.primary.main,
            mb: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: theme => theme.palette.text.dark,
            mb: 1,
            fontWeight: 600,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme => theme.palette.text.dark,
            mb: 3,
          }}
        >
          We couldn’t find the page you were looking for.  
          Maybe it was moved, deleted, or never existed.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme => theme.palette.text.dark,
            mb: 4,
            fontStyle: 'italic',
          }}
        >
          — JadeCaps PMS, your trusted multi-tenant platform —
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            px: 4,
            borderRadius: theme => theme.shape.borderRadius,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Back to Login
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound404;
