// // src/views/login/Login.component.jsx
// import React from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Divider,
// } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import AuthWrapper from '../../components/authwrapper/Authwrapper';

// const LoginComponent = ({
//   formData,
//   onChange,
//   onSubmit,
//   loading,
//   error,
//   user
// }) => {
//   return (
//     <AuthWrapper>
//       <Typography variant="h6">Login to Your Account</Typography>

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
//         type="password"
//         value={formData.password}
//         onChange={onChange}
//         variant="outlined"
//         // margin="normal"
//       />

//       <Box width="100%" mt={2}>
//         <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Button>
//       </Box>

//       {error && <Typography color="error" mt={1}>{error}</Typography>}
//       {user && <Typography color="success.main" mt={1}>Welcome {user?.email}</Typography>}

//       <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

//       <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
//         Login with Google
//       </Button>
//     </AuthWrapper>
//   );
// };

// export default LoginComponent;



import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthWrapper from '../../components/authwrapper/Authwrapper';
import { resendVerification, clearVerificationState } from '../../api/auth/verificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComponent = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  successMessage,
  user,
  unverifiedEmail,
  onResendVerification
}) => {
  const dispatch = useDispatch();
  const { status, message, error: resendError } = useSelector(state => state.verification);

  // Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearVerificationState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
    if (successMessage) toast.success(successMessage);
  }, [error, successMessage]);

  useEffect(() => {
    if (status === 'success') {
      toast.success(message);
    } else if (status === 'failed') {
      toast.error(resendError);
    }
  }, [status, message, resendError]);

  const handleOnResendVerification = () => {
    if (!formData.email) {
      dispatch({
        type: 'login/setError',
        payload: 'Email is required to resend verification',
      });
      return;
    }
    const normalizedEmail = formData.email.trim().toLowerCase();
    dispatch(resendVerification(normalizedEmail));
  };
6
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthWrapper>
      <ToastContainer />

      <Typography variant="h6" gutterBottom>
        Login to Your Account
      </Typography>

      {/* Show resend verification only if error & unverifiedEmail */}
      {error && unverifiedEmail && (
        <Box mt={1}>
          <Typography variant="body2">
            <Button
              color="primary"
              size="small"
              onClick={handleOnResendVerification}
              sx={{ ml: 1, textDecoration: 'underline' }}
            >
              Resend Verification Email
            </Button>
          </Typography>
        </Box>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={onChange}
        variant="outlined"
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={togglePasswordVisibility}
                edge="end"
                size="small"
                sx={{ color: '#ffffff' }}

              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box width="100%" mt={2}>
        <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>

      {/* <Box mt={1} textAlign="right">
        <Link href="/forgot-password" underline="hover">
          Forgot Password?
        </Link>
      </Box> */}

      <Divider sx={{ width: '100%', mt: 1, mb: 1 }}>or</Divider>

      {/* Uncomment if Google login needed */}
      {/* <Button 
        fullWidth 
        variant="outlined" 
        startIcon={<GoogleIcon />}
        disabled={loading}
      >
        Login with Google
      </Button> */}

      <Box mt={2}>
        <Typography variant="body2" color="#ffffff">
          Don't have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthWrapper>
  );
};

export default LoginComponent;
