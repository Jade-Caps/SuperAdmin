import React from 'react';
import {
    Box,
    Typography,
    Container,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Stack
} from '@mui/material';

import DocumentForm from './components/form';
import DocumentTable from './components/table';

const DocumentComponent = ({
    documents,
    loading,
    userType,
    tenants,
    selectedTenant,
    setSelectedTenant,
    onUpload
}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = (data) => {
        onUpload(data);
        handleClose();
    };

    return (
        <Box p={3}>
            <Box
                mt={4}
                mb={3}
                px={2}
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderRadius={2}
                boxShadow={2}
                bgcolor="background.paper"
            >
                <Typography variant="h4" fontWeight="bold">
                    Document Management
                </Typography>

                {userType === 'admin' && (
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        + Upload Document
                    </Button>
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <DocumentTable
                documents={documents}
                loading={loading}
                userType={userType}
                tenants={tenants}
            />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold">
                        Upload New Document
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Box mt={1}>
                        <DocumentForm
                            userType={userType}
                            tenants={tenants}
                            onSubmit={handleFormSubmit}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default DocumentComponent;
