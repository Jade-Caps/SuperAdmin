import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    IconButton,
    Typography,
    Box,
    Divider,
    Rating,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ResponseDialog = ({ open, onClose, feedback, onSubmit }) => {
    const [adminResponse, setAdminResponse] = useState('');
    const [status, setStatus] = useState('New');

    useEffect(() => {
        if (feedback) {
            setAdminResponse(feedback.adminResponse || '');
            setStatus(feedback.status || 'New');
        }
    }, [feedback]);

    const handleSubmit = () => {
        onSubmit({
            adminResponse,
            status
        });
        onClose();
    };

    if (!feedback) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Feedback Details & Response
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {/* Tenant Info */}
                    <Grid item xs={12}>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Tenant Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="textSecondary">
                                        Tenant Name
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {feedback.tenantInfo?.name || feedback.tenantName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="textSecondary">
                                        Admin Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {feedback.adminName} ({feedback.adminEmail})
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Feedback Details */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Feedback Details
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                            Title
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {feedback.title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                            Feature/Module
                        </Typography>
                        <Typography variant="body1">
                            {feedback.featureName}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                            Category
                        </Typography>
                        <Box mt={0.5}>
                            <Chip label={feedback.category} color="primary" size="small" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                            Priority
                        </Typography>
                        <Box mt={0.5}>
                            <Chip label={feedback.priority} color="warning" size="small" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">
                            Rating
                        </Typography>
                        <Rating value={feedback.rating} readOnly size="small" />
                    </Grid>

                    {feedback.pageModule && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="textSecondary">
                                Page/Module
                            </Typography>
                            <Typography variant="body1">
                                {feedback.pageModule}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                            Description
                        </Typography>
                        <Box 
                            sx={{ 
                                bgcolor: '#f9f9f9', 
                                p: 2, 
                                borderRadius: 1,
                                mt: 1
                            }}
                        >
                            <Typography variant="body1">
                                {feedback.description}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* Response Section */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Admin Response
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="New">New</MenuItem>
                                <MenuItem value="In Review">In Review</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Your Response"
                            fullWidth
                            multiline
                            rows={4}
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            placeholder="Enter your response to this feedback..."
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                            Created At: {new Date(feedback.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Update Response
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResponseDialog;

