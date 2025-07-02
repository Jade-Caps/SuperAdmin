// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SignupPage from './Signup.component';
// import { signupUser, clearSignupState } from '../../api/signup/signupSlice';

// const SignupContainer = () => {
//   const dispatch = useDispatch();
//   const { loading, error, successMessage } = useSelector((state) => state.signup);

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     dispatch(signupUser(formData));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(clearSignupState());
//     };
//   }, [dispatch]);

//   return (
//     <SignupPage
//       formData={formData}
//       onChange={handleChange}
//       onSubmit={handleSubmit}
//       loading={loading}
//       error={error}
//       successMessage={successMessage}
//     />
//   );
// };

// export default SignupContainer;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignupPage from './Signup.component';
import { signupUser, clearSignupState } from '../../api/signup/signupSlice';
import { clearVerificationState } from '../../api/auth/verificationSlice';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get signup state
  const signupState = useSelector((state) => state.signup);
  
  // Get verification state safely
  const verificationState = useSelector((state) => state.verification || {
    status: null,
    error: null,
    message: null
  });
  
  // Combine loading states
  const loading = signupState.loading || verificationState.status === 'loading';
  
  // Combine errors
  const error = signupState.error || verificationState.error;
  
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must include at least one lowercase letter';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must include at least one uppercase letter';
    }
    
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const signupData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    dispatch(signupUser(signupData));
  };

  useEffect(() => {
      // Handle signup success
      if (signupState.successMessage) {
          setSuccessMessage(signupState.successMessage);
      }
      
      // Handle resend verification success
      if (verificationState.message) {
          setSuccessMessage(verificationState.message);
      }
      
      // Handle special case for existing unverified accounts
      if (signupState.error && 
          signupState.error.includes('Account already exists but not verified')) {
          setSuccessMessage(signupState.error);
      }
  }, [signupState, verificationState]);

  useEffect(() => {
    return () => {
      dispatch(clearSignupState());
      dispatch(clearVerificationState());
    };
  }, [dispatch]);

  return (
    <SignupPage
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      successMessage={successMessage}
      formErrors={formErrors}
    />
  );
};

export default SignupContainer;