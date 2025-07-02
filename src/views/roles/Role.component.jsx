import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TablePagination,
    Menu,
    MenuItem
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RoleForm from './components/form';
import RoleTable from './components/table';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { useTheme } from '@mui/material/styles';
import { showSuccess, showError } from '../../utils/toastMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleComponent = ({ roles, loading, error, onSubmit }) => {
    const theme = useTheme();
    const [search, setSearch] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Export menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Show error toast if `error` is passed
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);

    const filteredRoles = roles?.filter(role =>
        role.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const paginatedRoles = filteredRoles.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleExport = (type) => {
        const dataToExport = filteredRoles.map((role) => ({
            Name: role.name,
            CreatedAt: new Date(role.createdAt).toLocaleDateString(),
        }));

        if (type === 'excel') {
            exportToExcel(dataToExport, 'Roles_List');
            showSuccess('Exported to Excel!');
        } else if (type === 'pdf') {
            exportToPDF(['Name', 'CreatedAt'], dataToExport, 'Roles Report');
            showSuccess('Exported to PDF!');
        }

        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2} sx={{ textAlign: 'center' }}>
                Manage Roles
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>
                <TextField
                    label="Search Roles"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Box display="flex" gap={1}>
                    <Button variant="whiteOutlined" onClick={() => setDialogOpen(true)}>
                        Add Role
                    </Button>
                    <Button
                        variant="whiteOutlined"
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}
                    >
                        Export
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => handleExport('excel')}>Export as Excel</MenuItem>
                        <MenuItem onClick={() => handleExport('pdf')}>Export as PDF</MenuItem>
                    </Menu>
                </Box>
            </Box>

            {loading && <CircularProgress />}

            <Box mt={2}>
                <RoleTable roles={paginatedRoles} />
            </Box>

            <TablePagination
                component="div"
                count={filteredRoles.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{
                    color: theme.palette.text.dark,
                    backgroundColor: theme.palette.background.default,
                    mt: 1
                }}
            />

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add New Role</DialogTitle>
                <DialogContent dividers>
                    <RoleForm
                        onSubmit={async (data) => {
                            try {
                                await onSubmit(data); // if it's a promise
                                showSuccess('Role added successfully!');
                                setDialogOpen(false);
                            } catch (err) {
                                console.error(err);
                                showError('Failed to add role.');
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Box>
    );
};

export default RoleComponent;
