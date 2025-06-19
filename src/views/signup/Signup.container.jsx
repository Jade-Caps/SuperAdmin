import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignupPage from './Signup.component';
import { signupUser, clearSignupState } from '../../api/signup/signupSlice';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.signup);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(clearSignupState());
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
    />
  );
};

export default SignupContainer;
