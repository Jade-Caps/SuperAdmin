import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    useTheme,
    Paper,
    Card,
    CardContent,
    CardActions,
    Divider
} from '@mui/material';

const requiredFields = ['name', 'companyName', 'designation', 'state', 'phone'];

const Profile = ({ data, loading, error, onSubmit }) => {
    const theme = useTheme();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyRegNumber: '',
        logoURL: '',
        addressLine1: '',
        designation: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name || '',
                phone: data.phone || '',
                companyName: data.companyName || '',
                companyRegNumber: data.companyRegNumber || '',
                logoURL: data.logoURL || '',
                addressLine1: data.addressLine1 || '',
                designation: data.designation || '',
                city: data.city || '',
                state: data.state || '',
                postalCode: data.postalCode || '',
                country: data.country || ''
            });
        }
    }, [data]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setEditMode(false);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const isEmptyProfile = !data || Object.values(data).every((v) => !v);

    const renderField = (key) => {
        const shouldDisable = key === 'companyName' && form.companyName.trim() !== '';
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        return (
            <TextField
                key={key}
                name={key}
                label={label}
                fullWidth
                margin="normal"
                value={form[key] || ''}
                onChange={handleChange}
                required={requiredFields.includes(key)}
                disabled={shouldDisable}
                InputProps={{
                    sx: {
                        ...(shouldDisable && {
                            '&.Mui-disabled': {
                                WebkitTextFillColor: theme.palette.text.primary,
                            },
                            '& input.Mui-disabled': {
                                WebkitTextFillColor: theme.palette.text.primary,
                            },
                        }),
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.dark,
                        borderRadius: 1
                    }
                }}
                InputLabelProps={{
                    sx: {
                        color: theme.palette.text.primary
                    }
                }}
            />
        );
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 700,
                    mx: 'auto',
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.dark
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Tenant Profile
                </Typography>

                {!editMode && !isEmptyProfile ? (
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.background.dark,
                            color: theme.palette.text.primary,
                            mt: 2
                        }}
                    >
                        <CardContent>
                            {Object.entries(form).map(([key, value]) =>
                                value ? (
                                    <Box
                                        key={key}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1,
                                            borderBottom: `1px solid ${theme.palette.divider}`
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: theme.palette.text.primary, minWidth: '40%', fontWeight: 500 }}
                                        >
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: theme.palette.text.primary, textAlign: 'right' }}>
                                            {value}
                                        </Typography>
                                    </Box>
                                ) : null
                            )}
                        </CardContent>

                        <CardActions>
                            <Button variant="contained" onClick={() => setEditMode(true)} sx={{ ml: 2, mb: 2 }}>
                                Edit Profile
                            </Button>
                        </CardActions>
                    </Card>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        {Object.keys(form).map((key) => renderField(key))}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button variant="contained" type="submit">
                                {isEmptyProfile ? 'Create Profile' : 'Update Profile'}
                            </Button>
                            {!isEmptyProfile && (
                                <Button variant="outlined" onClick={() => setEditMode(false)}>
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Profile;
