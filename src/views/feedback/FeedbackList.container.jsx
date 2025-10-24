import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllFeedback,
    updateFeedbackResponse
} from '../../api/feedback/feedbackSlice';
import { fetchTenants } from '../../api/allTenants/tenantSlice';
import FeedbackListComponent from './FeedbackList.component';
import { toast } from 'react-toastify';

const FeedbackListContainer = () => {
    const dispatch = useDispatch();

    const { list: feedbacks, loading } = useSelector((state) => state.feedback);
    const tenants = useSelector((state) => state.tenants.list);

    useEffect(() => {
        dispatch(fetchAllFeedback());
        dispatch(fetchTenants());
    }, [dispatch]);

    const handleFilterChange = (filters) => {
        // Filter locally by tenant if needed
        if (filters.tenant) {
            // You could either filter client-side or call fetchFeedbackByTenant
            const filteredByTenant = feedbacks.filter(
                f => f.tenantInfo?.id === filters.tenant || f.tenantId === filters.tenant
            );
            // For now, we'll just re-fetch with server filters
            dispatch(fetchAllFeedback(filters));
        } else {
            dispatch(fetchAllFeedback(filters));
        }
    };

    const handleUpdateFeedback = async (tenantId, feedbackId, data) => {
        try {
            await dispatch(updateFeedbackResponse({ tenantId, feedbackId, data })).unwrap();
            toast.success('Feedback updated successfully!');
            // Refresh the list
            dispatch(fetchAllFeedback());
        } catch (error) {
            toast.error(error || 'Failed to update feedback');
        }
    };

    return (
        <FeedbackListComponent
            feedbacks={feedbacks || []}
            loading={loading}
            onFilterChange={handleFilterChange}
            onUpdateFeedback={handleUpdateFeedback}
            tenants={tenants || []}
        />
    );
};

export default FeedbackListContainer;

