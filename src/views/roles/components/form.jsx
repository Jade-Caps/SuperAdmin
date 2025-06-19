import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const RoleForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim()) {
      onSubmit(form);
      setForm({ name: '', description: '' });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      mt={1}
    >
      <TextField
        name="name"
        label="Role Name"
        value={form.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">Save Role</Button>
    </Box>
  );
};

export default RoleForm;
