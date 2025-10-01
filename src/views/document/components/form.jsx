import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const DocumentForm = ({ userType, tenants, onSubmit }) => {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {userType === 'admin' && (
          <Controller
            name="tenantId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Tenant</InputLabel>
                <Select {...field} label="Tenant">
                  {tenants.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        <Controller
          name="docType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Document Type" fullWidth {...field} />
          )}
        />
        <Controller
          name="docName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Document Name" fullWidth {...field} />
          )}
        />

        <Controller
          name="file"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              type="file"
              onChange={(e) => field.onChange(e.target.files[0])}
              fullWidth
            />
          )}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default DocumentForm;
