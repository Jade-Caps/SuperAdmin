import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

// 🔸 Fetch all documents (for SuperAdmin)
export const fetchAllDocuments = createAsyncThunk(
  'documents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/superadmin/documents');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all documents');
    }
  }
);

// 🔸 Fetch all documents for a specific tenant
export const fetchDocumentsByTenant = createAsyncThunk(
  'documents/fetchByTenant',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/superadmin/tenants/documents');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tenant documents');
    }
  }
);


// 🔸 Fetch a specific document by ID
export const fetchDocumentById = createAsyncThunk(
  'documents/fetchById',
  async (docId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/superadmin/documents/doc/${docId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch document');
    }
  }
);

// 🔸 Upload a new document
export const uploadDocument = createAsyncThunk(
  'documents/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/superadmin/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to upload document');
    }
  }
);



const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentDocument(state) {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all documents (SuperAdmin)
      .addCase(fetchAllDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch documents by tenant
      .addCase(fetchDocumentsByTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentsByTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDocumentsByTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch document by ID
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Upload document
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // Insert at beginning
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentDocument } = documentSlice.actions;

export default documentSlice.reducer;
