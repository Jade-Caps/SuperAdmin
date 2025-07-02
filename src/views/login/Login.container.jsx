import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../api/login/loginSlice';
import LoginComponent from '../../views/login/Login.component';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Fixed: useLocation is a function, so call it
  const queryParams = new URLSearchParams(location.search);

  const { user, loading, error } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for handling error messages
  const [errorState, setErrorState] = useState(null);
  
  // Handle verification status from URL params
  const verified = queryParams.get('verified');
  const verificationMessage = queryParams.get('message');
  const [successMessage, setSuccessMessage] = useState(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);

  // Handle login errors
  useEffect(() => {
      if (error) {
          let errorMsg = '';
          if (typeof error === 'object' && error.message) {
              errorMsg = error.message;
          } else if (typeof error === 'string') {
              errorMsg = error;
          } else {
              errorMsg = 'Login failed. Please try again.';
          }
          setErrorState(errorMsg);
          // Check if error is due to unverified account
          if (errorMsg.includes('Please verify your email address')) {
              setUnverifiedEmail(formData.email);
          } else {
              setUnverifiedEmail(null);
          }
      }
  }, [error]);

  const handleResendVerification = () => {
      if (unverifiedEmail) {
          dispatch(resendVerification(unverifiedEmail.trim().toLowerCase()));
      }
  };

  useEffect(() => {
    if (verified === 'true') {
      setSuccessMessage(decodeURIComponent(verificationMessage));
      setErrorState(null);
    } else if (verified === 'false') {
      setErrorState(decodeURIComponent(verificationMessage));
    }
  }, [verified, verificationMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errorState) setErrorState(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setErrorState(null);
    setSuccessMessage(null);
    
    dispatch(loginUser(formData));
  };

  // Handle login errors
  useEffect(() => {
    if (error) {
      // Convert error object to string
      if (typeof error === 'object' && error.message) {
        setErrorState(error.message);
      } else if (typeof error === 'string') {
        setErrorState(error);
      } else {
        setErrorState('Login failed. Please try again.');
      }
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      const userType = user?.userType || 'tenant';
      navigate(userType === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  }, [user, navigate]);

  return (
    <LoginComponent
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={errorState}
      successMessage={successMessage}
      user={user}
      unverifiedEmail={unverifiedEmail}
      onResendVerification={handleResendVerification}
    />
  );
};

export default LoginPage;