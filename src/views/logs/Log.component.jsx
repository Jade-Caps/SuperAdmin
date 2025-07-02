// src/pages/Log/Log.component.jsx
import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    TextField,
    TablePagination,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    useTheme,
} from '@mui/material';
import LogTable from './components/table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogComponent = ({ logs, loading, error }) => {
    const [search, setSearch] = useState('');
    const theme = useTheme();
    const [action, setAction] = useState('ALL');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Show error toast if error exists
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const uniqueActions = useMemo(() => {
        const actions = new Set();
        logs?.forEach((log) => {
            if (log.action) actions.add(log.action);
        });
        return ['ALL', ...Array.from(actions)];
    }, [logs]);

    const filteredLogs = logs?.filter((log) => {
        const emailMatch = log.userEmail?.toLowerCase().includes(search.toLowerCase());
        const actionMatch = action === 'ALL' || log.action === action;
        return emailMatch && actionMatch;
    });

    const paginatedLogs =
        rowsPerPage === -1
            ? filteredLogs
            : filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2} align="center">
                Activity Logs
            </Typography>

            <Box
                mb={2}
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <TextField
                    label="Search by Email"
                    size="small"
                    variant="outlined"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                />

                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Filter by Action</InputLabel>
                    <Select
                        value={action}
                        label="Filter by Action"
                        onChange={(e) => {
                            setAction(e.target.value);
                            setPage(0);
                        }}
                    >
                        {uniqueActions.map((act) => (
                            <MenuItem
                                key={act}
                                value={act}
                                sx={{ color: theme.palette.text.dark }}
                            >
                                {act}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading && <CircularProgress />}

            {!loading && !error && (
                <>
                    <LogTable logs={paginatedLogs} />

                    <TablePagination
                        component="div"
                        count={filteredLogs.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setRowsPerPage(val);
                            setPage(0);
                        }}
                        rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: 'All', value: -1 }
                        ]}
                        sx={{
                            color: theme.palette.text.dark,
                            backgroundColor: theme.palette.background.default,
                            mt: 1
                        }}
                    />
                </>
            )}

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

export default LogComponent;
