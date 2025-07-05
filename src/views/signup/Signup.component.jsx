// import React from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Divider
// } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import AuthWrapper from '../../components/authwrapper/Authwrapper';

// const SignupPage = ({
//   formData,
//   onChange,
//   onSubmit,
//   loading,
//   error,
//   successMessage
// }) => {
//   return (
//     <AuthWrapper>
//       <Typography variant="h6">Create an Account</Typography>

//       <TextField
//         fullWidth
//         label="Username"
//         name="username"
//         value={formData.username}
//         onChange={onChange}
//         variant="outlined"
//         // margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={onChange}
//         variant="outlined"
//         // margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Password"
//         name="password"
//         value={formData.password}
//         onChange={onChange}
//         type="password"
//         variant="outlined"
//         // margin="normal"
//       />

//       <Box width="100%" mt={2}>
//         <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
//           {loading ? 'Registering...' : 'Sign Up'}
//         </Button>
//       </Box>

//       {error && <Typography color="error">{error}</Typography>}
//       {successMessage && <Typography color="success.main">{successMessage}</Typography>}

//       <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

//       <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
//         Sign up with Google
//       </Button>
//     </AuthWrapper>
//   );
// };

// export default SignupPage;



import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resendVerification } from '../../api/auth/verificationSlice';
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  withTheme,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthWrapper from '../../components/authwrapper/Authwrapper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  successMessage,
  formErrors = {},
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };


  const handleResend = () => {
    if (formData.email) {
      const normalizedEmail = formData.email.trim().toLowerCase();
      dispatch(resendVerification(normalizedEmail));
      toast.info('Resending verification email...');
    } else {
      dispatch({
        type: 'signup/setError',
        payload: 'Email is required to resend verification',
      });
      toast.error('Email is required to resend verification');
    }
  };

  // Check if we should show the resend option
  const showResendOption =
    successMessage &&
    (successMessage.includes('Verification email') ||
      successMessage.includes('verification') ||
      successMessage.includes('email'));

  // Show toast notifications on success or error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [error, successMessage]);

  return (
    <AuthWrapper>
      <ToastContainer autoClose={3000} />

      <Typography variant="h6" gutterBottom>
        Create an Account
      </Typography>

      {successMessage && showResendOption && (
        <Box mt={2}>
          <Typography variant="body2">
            Didn't receive the email?
            <Button
              color="primary"
              size="small"
              onClick={handleResend}
              disabled={loading}
              sx={{ ml: 1, textDecoration: 'underline' }}
            >
              Resend
            </Button>
          </Typography>
          <Typography variant="body2" sx={{ color: '#ff9800' }} mt={1}>
           Verification link expires in 15 minutes.
          </Typography>
        </Box>
      )}

      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        variant="outlined"
        margin="normal"
        error={!!formErrors.username}
        helperText={formErrors.username}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        variant="outlined"
        margin="normal"
        error={!!formErrors.email}
        helperText={formErrors.email}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        value={formData.password}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
        disabled={loading}
        InputProps={{
          
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={loading}
                sx={{ color: '#ffffff' }}  // white icon color

              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box width="100%" mt={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={onSubmit}
          disabled={loading}
          size="large"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </Box>

      <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

      {/* <Button 
        fullWidth 
        variant="outlined" 
        startIcon={<GoogleIcon />}
        disabled={loading}
        size="large"
      >
        Sign up with Google
      </Button> */}

      <Box mt={2}>
        <Typography variant="body2" color="#fff">
          Already have an account?{' '}
          {/* <Link href="/login" underline="hover">
            Sign in
          </Link> */}
          <Button
            color="primary"
            size="small"
            onClick={() => navigate('/login')}
            disabled={loading}
            sx={{ ml: 1, textDecoration: 'underline' }}
          >
            Sign in
          </Button>
        </Typography>
      </Box>
    </AuthWrapper>
  );
};

export default SignupPage;