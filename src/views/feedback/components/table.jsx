import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Rating,
    Typography,
    Box,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';

const FeedbackTable = ({ feedbacks, onViewResponse, loading }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return 'primary';
            case 'In Review':
                return 'warning';
            case 'Resolved':
                return 'success';
            case 'Closed':
                return 'default';
            default:
                return 'default';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Bug Report':
                return 'error';
            case 'Feature Request':
                return 'info';
            case 'Improvement':
                return 'warning';
            case 'General':
                return 'default';
            default:
                return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'error';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'success';
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!feedbacks || feedbacks.length === 0) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <Typography>No feedback found</Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Tenant</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Feature</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbacks.map((feedback, index) => (
                        <TableRow key={feedback.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Tooltip title={feedback.tenantInfo?.email || feedback.tenantName}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {feedback.tenantInfo?.name || feedback.tenantName}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={feedback.adminEmail}>
                                    <Typography variant="body2">
                                        {feedback.adminName}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" fontWeight="bold">
                                    {feedback.title}
                                </Typography>
                            </TableCell>
                            <TableCell>{feedback.featureName}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={feedback.category} 
                                    color={getCategoryColor(feedback.category)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <Rating value={feedback.rating} readOnly size="small" />
                            </TableCell>
                            <TableCell>
                                <Chip 
                                    label={feedback.priority} 
                                    color={getPriorityColor(feedback.priority)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <Chip 
                                    label={feedback.status} 
                                    color={getStatusColor(feedback.status)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {format(new Date(feedback.createdAt), 'dd MMM yyyy')}
                            </TableCell>
                            <TableCell>
                                <Tooltip title="View & Respond">
                                    <IconButton 
                                        onClick={() => onViewResponse(feedback)} 
                                        size="small"
                                        color="primary"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FeedbackTable;

