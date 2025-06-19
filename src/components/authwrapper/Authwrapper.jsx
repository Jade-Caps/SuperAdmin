import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import Logo from '../../assets/jadecapslogo.png';

const AuthWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          // borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.dark,

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
            transition: 'all 0.3s ease-in-out',

          }}
        />

        {/* Dynamic children (e.g., Login or Register Form) */}
        {children}
      </Paper>
    </Box>
  );
};

export default AuthWrapper;
