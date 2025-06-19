import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AuthWrapper from '../../components/authwrapper/Authwrapper';

const SignupPage = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  successMessage
}) => {
  return (
    <AuthWrapper>
      <Typography variant="h6">Create an Account</Typography>

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        variant="outlined"
        // margin="normal"
      />
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
        value={formData.password}
        onChange={onChange}
        type="password"
        variant="outlined"
        // margin="normal"
      />

      <Box width="100%" mt={2}>
        <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
          {loading ? 'Registering...' : 'Sign Up'}
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}

      <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

      <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
        Sign up with Google
      </Button>
    </AuthWrapper>
  );
};

export default SignupPage;
