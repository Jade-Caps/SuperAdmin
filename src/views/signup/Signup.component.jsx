import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const autofillFix = {
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 1000px #0f2437 inset',
      WebkitTextFillColor: '#fff',
      caretColor: '#fff',
    },
  };

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

  const showResendOption =
    successMessage &&
    (successMessage.includes('Verification email') ||
      successMessage.includes('verification') ||
      successMessage.includes('email'));

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
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={1} sx={{ color: '#fff' }}>
        Create your account
      </Typography>
     

      {successMessage && showResendOption && (
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            Didn't receive the email?
            <Button
              color="primary"
              size="small"
              onClick={handleResend}
              disabled={loading}
              sx={{ ml: 1, textDecoration: 'underline', color: '#fff' }}
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
          '& .MuiFormHelperText-root': {
            color: '#fff',
          },
        }}
        InputProps={{
          sx: {
            ...autofillFix,
          },
        }}
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
          '& .MuiFormHelperText-root': {
            color: '#fff',
          },
        }}
        InputProps={{
          sx: {
            ...autofillFix,
          },
        }}
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
          '& .MuiFormHelperText-root': {
            color: '#fff',
          },
        }}
        InputProps={{
          sx: {
            ...autofillFix,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={loading}
                sx={{ color: '#fff' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      <Divider sx={{ width: '100%', my: 2, '&::before, &::after': { borderColor: '#fff' } }}>
        <Typography sx={{ color: '#fff' }}>or</Typography>
      </Divider>

      {/*
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        disabled={loading}
        size="large"
        sx={{ mb: 1 }}
      >
        Sign up with Google
      </Button>
      */}

      <Box mt={2} width="100%" textAlign="center">
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Already have an account?{' '}
          <Button
            color="primary"
            size="small"
            onClick={() => navigate('/login')}
            disabled={loading}
            sx={{ ml: 1, textDecoration: 'underline', fontWeight: 600, color: '#fff' }}
          >
            Sign in
          </Button>
        </Typography>
      </Box>
    </AuthWrapper>
  );
};

export default SignupPage;