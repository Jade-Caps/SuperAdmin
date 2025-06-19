import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/login/loginSlice';
import LoginComponent from '../../views/login/Login.component';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔒 prevent default form submit if you're using a form
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      console.log('🚀 Logged in as:', user);
      const userType = user?.userType;

      if (userType === 'admin') {
        navigate('/profile/admin');
      } else if (userType === 'tenant') {
        navigate('/profile/user');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <LoginComponent
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      user={user}
    />
  );
};

export default LoginPage;
