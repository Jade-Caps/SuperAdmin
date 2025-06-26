// src/pages/Log/Log.component.jsx
import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    TextField,
    TablePagination,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    useTheme,
} from '@mui/material';
import LogTable from './components/table';

const LogComponent = ({ logs, loading, error }) => {
    const [search, setSearch] = useState('');
    const theme = useTheme();
    const [action, setAction] = useState('ALL');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Extract unique actions from logs
    const uniqueActions = useMemo(() => {
        const actions = new Set();
        logs?.forEach((log) => {
            if (log.action) actions.add(log.action);
        });
        return ['ALL', ...Array.from(actions)];
    }, [logs]);

    // Filter based on search + action
    const filteredLogs = logs?.filter((log) => {
        const emailMatch = log.userEmail?.toLowerCase().includes(search.toLowerCase());
        const actionMatch = action === 'ALL' || log.action === action;
        return emailMatch && actionMatch;
    });

    // Paginate only if rowsPerPage isn't "All"
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
                        setPage(0); // Reset page on filter change
                    }}
                />

                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Filter by Action</InputLabel>
                    <Select
                        value={action}
                        label="Filter by Action"
                        onChange={(e) => {
                            setAction(e.target.value);
                            setPage(0); // Reset page on filter change
                        }}
                       
                    >
                        {uniqueActions.map((act) => (
                            <MenuItem key={act} value={act}  sx ={{color: theme.palette.text.dark,}}>
                                {act}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

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
        </Box>
    );
};

export default LogComponent;
