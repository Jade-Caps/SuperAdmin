import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Alert,
    TablePagination,
    Menu,
    MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

const TenantsListComponent = ({ tenants = [], loading, error }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Export menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExport = (type) => {
        const dataToExport = tenants.map(({ name, email, phone, createdAt }) => ({
            Name: name,
            Email: email,
            Phone: phone || '-',
            CreatedAt: new Date(createdAt).toLocaleDateString(),
        }));

        if (type === 'excel') {
            exportToExcel(dataToExport, 'Users_List');
        } else if (type === 'pdf') {
            const columns = ['Name', 'Email', 'Phone', 'CreatedAt' , 'Last Login' , 'Company Name'];
            exportToPDF(columns, dataToExport, 'Users Report');
        }

        handleClose();
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page on rows change
    };

    const paginatedTenants = tenants.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.palette.text.dark, textAlign: 'center' }}
            >
                All Users
            </Typography>

            {tenants.length === 0 ? (
                <Typography>No Users found.</Typography>
            ) : (
                <>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
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
                            <MenuItem onClick={() => handleExport('excel')}>
                                Export as Excel
                            </MenuItem>
                            <MenuItem onClick={() => handleExport('pdf')}>
                                Export as PDF
                            </MenuItem>
                        </Menu>
                    </Box>

                    <TableContainer
                        component={Paper}
                        elevation={3}
                        sx={{ backgroundColor: theme.palette.background.default }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedTenants.map((tenant, index) => (
                                    <TableRow key={tenant.id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{tenant.name}</TableCell>
                                        <TableCell>{tenant.email}</TableCell>
                                        <TableCell>{tenant.phone || '-'}</TableCell>
                                        <TableCell>
                                            {new Date(tenant.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="whiteOutlined"
                                                size="small"
                                                onClick={() => navigate(`/users/${tenant.id}`)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={tenants.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        sx={{
                            color: theme.palette.text.dark,
                            backgroundColor: theme.palette.background.default,
                            mt: 1
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default TenantsListComponent;
