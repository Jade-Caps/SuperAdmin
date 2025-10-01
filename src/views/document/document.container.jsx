import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllDocuments,
    fetchDocumentsByTenant,
    uploadDocument
} from '../../api/document/documentSlice';
import { fetchTenants } from '../../api/allTenants/tenantSlice';
import DocumentComponent from './document.component';

const DocumentContainer = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.login);
    const { list: documents, loading } = useSelector((state) => state.documents);
    const tenants = useSelector((state) => state.tenants.list);

    const [selectedTenant, setSelectedTenant] = useState(
        user?.userType === 'tenant' ? user.tenantId : ''
    );

    useEffect(() => {
        if (user.userType === 'admin') {
            dispatch(fetchTenants());
            dispatch(fetchAllDocuments());
        } else if (user.userType === 'tenant') {
            dispatch(fetchDocumentsByTenant());
        }
    }, [dispatch, user]);

    const handleUpload = (data) => {
        const formData = new FormData();
        formData.append('tenantId', user.userType === 'admin' ? data.tenantId : user.tenantId);
        formData.append('docType', data.docType);
        formData.append('docName', data.docName);

        formData.append('file', data.file);
        dispatch(uploadDocument(formData));
    };

    return (
        <DocumentComponent
            documents={documents}
            loading={loading}
            tenants={tenants}
            userType={user.userType}
            selectedTenant={selectedTenant}
            setSelectedTenant={setSelectedTenant}
            onUpload={handleUpload}
        />
    );
};

export default DocumentContainer;
