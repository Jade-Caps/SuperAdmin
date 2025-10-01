import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
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
  unverifiedEmail
}) => {
  const dispatch = useDispatch();
  const { status, message, error: resendError } = useSelector(state => state.verification);
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

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const autofillFix = {
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 1000px #0f2437 inset',
      WebkitTextFillColor: '#fff',
      caretColor: '#fff'
    }
  };

  return (
    <AuthWrapper>
      <ToastContainer />
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={1} sx={{ color: '#fff' }}>
        Sign in to your account
      </Typography>
      <Typography variant="body2" textAlign="center" mb={3} sx={{ color: '#fff' }}>
        {/* Enter your credentials to access the SuperAdmin panel. */}
      </Typography>

      {error && unverifiedEmail && (
        <Box mt={1}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            <Button
              color="primary"
              size="small"
              onClick={handleOnResendVerification}
              sx={{ ml: 1, textDecoration: 'underline', color: '#fff' }}
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
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
            '&.Mui-focused': {
              color: '#fff',
            },
          },
        }}
        InputProps={{
          sx: {
            ...autofillFix
          }
        }}
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
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
            '&.Mui-focused': {
              color: '#fff',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={togglePasswordVisibility}
                edge="end"
                size="small"
                sx={{ color: '#fff' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            ...autofillFix
          }
        }}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2, mb: 1, fontWeight: 700, fontSize: '1.1rem', py: 1.2, borderRadius: 2 }}
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Sign In'}
      </Button>

      <Divider sx={{ width: '100%', my: 2, '&::before, &::after': { borderColor: '#fff' } }}>
        <Typography sx={{ color: '#fff' }}>or</Typography>
      </Divider>

      <Box mt={2} width="100%" textAlign="center">
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" underline="hover" sx={{ fontWeight: 600, color: '#fff' }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthWrapper>
  );
};

export default LoginComponent;