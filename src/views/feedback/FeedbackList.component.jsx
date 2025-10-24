import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Menu,
    TablePagination
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FeedbackTable from './components/table';
import ResponseDialog from './components/responseDialog';
import { toast } from 'react-toastify';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

const FeedbackListComponent = ({
    feedbacks,
    loading,
    onFilterChange,
    onUpdateFeedback,
    tenants = []
}) => {
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        priority: '',
        rating: '',
        tenant: ''
    });
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const openExportMenu = Boolean(anchorEl);

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleViewResponse = (feedback) => {
        setSelectedFeedback(feedback);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedFeedback(null);
    };

    const handleSubmitResponse = (data) => {
        if (selectedFeedback) {
            onUpdateFeedback(
                selectedFeedback.tenantInfo?.id || selectedFeedback.tenantId,
                selectedFeedback.id,
                data
            );
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExportMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setAnchorEl(null);
    };

    const handleExport = (type) => {
        const dataToExport = feedbacks.map(f => ({
            Tenant: f.tenantInfo?.name || f.tenantName,
            Admin: f.adminName,
            Title: f.title,
            Feature: f.featureName,
            Category: f.category,
            Rating: f.rating,
            Priority: f.priority,
            Status: f.status,
            'Created At': new Date(f.createdAt).toLocaleDateString()
        }));

        if (type === 'excel') {
            exportToExcel(dataToExport, 'Feedback_Report');
            toast.success('Exported to Excel successfully!');
        } else if (type === 'pdf') {
            const columns = ['Tenant', 'Admin', 'Title', 'Feature', 'Category', 'Rating', 'Priority', 'Status', 'Created At'];
            exportToPDF(columns, dataToExport, 'Feedback Report');
            toast.success('Exported to PDF successfully!');
        }

        handleExportMenuClose();
    };

    // Pagination
    const paginatedFeedbacks = feedbacks.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        Feedback Management
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadIcon />}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleExportMenuClick}
                    >
                        Export
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={openExportMenu}
                        onClose={handleExportMenuClose}
                    >
                        <MenuItem onClick={() => handleExport('excel')}>Export to Excel</MenuItem>
                        <MenuItem onClick={() => handleExport('pdf')}>Export to PDF</MenuItem>
                    </Menu>
                </Box>

                <Typography variant="body2" color="textSecondary" mb={3}>
                    View and manage feedback from all tenants
                </Typography>

                {/* Filters */}
                <Grid container spacing={2} mb={3}>
                    {/* Row 1: 3 filters - Equal width */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Tenant</InputLabel>
                            <Select
                                value={filters.tenant}
                                label="Tenant"
                                onChange={(e) => handleFilterChange('tenant', e.target.value)}
                            >
                                <MenuItem value="">All Tenants</MenuItem>
                                {tenants.map((tenant) => (
                                    <MenuItem key={tenant.id} value={tenant.id}>
                                        {tenant.username || tenant.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={filters.category}
                                label="Category"
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <MenuItem value="">All Categories</MenuItem>
                                <MenuItem value="Bug Report">Bug Report</MenuItem>
                                <MenuItem value="Feature Request">Feature Request</MenuItem>
                                <MenuItem value="Improvement">Improvement</MenuItem>
                                <MenuItem value="General">General</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status}
                                label="Status"
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="New">New</MenuItem>
                                <MenuItem value="In Review">In Review</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Row 2: 2 filters - Equal width */}
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={filters.priority}
                                label="Priority"
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Rating</InputLabel>
                            <Select
                                value={filters.rating}
                                label="Rating"
                                onChange={(e) => handleFilterChange('rating', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="5">5 Stars</MenuItem>
                                <MenuItem value="4">4 Stars</MenuItem>
                                <MenuItem value="3">3 Stars</MenuItem>
                                <MenuItem value="2">2 Stars</MenuItem>
                                <MenuItem value="1">1 Star</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* Stats Summary */}
                <Box mb={2}>
                    <Typography variant="body2">
                        Total Feedback: <strong>{feedbacks.length}</strong>
                    </Typography>
                </Box>

                {/* Table */}
                <FeedbackTable
                    feedbacks={paginatedFeedbacks}
                    loading={loading}
                    onViewResponse={handleViewResponse}
                />

                {/* Pagination */}
                <TablePagination
                    component="div"
                    count={feedbacks.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>

            {/* Response Dialog */}
            <ResponseDialog
                open={openDialog}
                onClose={handleCloseDialog}
                feedback={selectedFeedback}
                onSubmit={handleSubmitResponse}
            />
        </Box>
    );
};

export default FeedbackListComponent;