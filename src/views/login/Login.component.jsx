// src/views/login/Login.component.jsx
import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AuthWrapper from '../../components/authwrapper/Authwrapper';

const LoginComponent = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  user
}) => {
  return (
    <AuthWrapper>
      <Typography variant="h6">Login to Your Account</Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={onChange}
        variant="outlined"
        // margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        variant="outlined"
        // margin="normal"
      />

      <Box width="100%" mt={2}>
        <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>

      {error && <Typography color="error" mt={1}>{error}</Typography>}
      {user && <Typography color="success.main" mt={1}>Welcome {user?.email}</Typography>}

      <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

      <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
        Login with Google
      </Button>
    </AuthWrapper>
  );
};

export default LoginComponent;
