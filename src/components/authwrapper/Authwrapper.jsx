import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import Logo from '../../assets/jadecapslogo.png';

const AuthWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 4, sm: 6 },
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#0f2437',
          boxShadow: '0 12px 40px rgba(15,36,55,0.32)',
          gap: 3,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Company Logo"
          sx={{
            height: 60,
            mb: 1,
            transition: 'all 0.3s ease-in-out',
          }}
        />
        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
          Welcome to JadeCaps
        </Typography>
        {/* Dynamic children (e.g., Login or Register Form) */}
        {children}
      </Paper>
    </Box>
  );
};

export default AuthWrapper;
