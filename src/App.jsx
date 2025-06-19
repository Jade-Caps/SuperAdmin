// src/App.jsx
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from '../styles/theme';
import Navbar from './common/navbar/Navbar';
import Sidebar from './common/sidebar/Sidebar';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Box sx={{ mt: 2, px: 3 }}>
              <AppRoutes />
            </Box>
          </Box>
        </Box>
        {/* ✅ Global Toaster */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
