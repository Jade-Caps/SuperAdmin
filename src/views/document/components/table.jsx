import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    CircularProgress,
    Typography,
    Button
} from '@mui/material';

const DocumentTable = ({ documents, loading, userType, tenants = [] }) => {
    const getTenantName = (id) => {
        const tenant = tenants.find((t) => t.id === id);
        return tenant?.username || tenant?.email || id;
    };

    if (loading) return <CircularProgress />;

    if (!documents || documents.length === 0)
        return <Typography variant="h6" color="textSecondary">No documents available.</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Document Name</TableCell>

                        <TableCell>Document Type</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Uploaded At (IST)</TableCell>
                        {(userType === 'admin') && <TableCell>Tenant</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((doc, index) => (
                        <TableRow key={doc.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{doc.docName}</TableCell>

                            <TableCell>{doc.docType}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    href={doc.fileURL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View
                                </Button>
                            </TableCell>
                            <TableCell>
                                {doc.uploadedAt
                                    ? new Date(doc.uploadedAt).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })
                                    : 'N/A'}
                            </TableCell>
                            {(userType === 'admin') && (
                                <TableCell>{getTenantName(doc.tenantId)}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DocumentTable;
