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
import Footer from './common/footer/Footer';

function App() {
  // 👇 Example: check token in localStorage
  // const isLoggedIn = !!localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          {/* ✅ Show only when logged in */}
          { <Sidebar />}

          <Box sx={{ flexGrow: 1 }}>
            {/* ✅ Navbar can also be conditional if needed */}
            { <Navbar />}

            <Box sx={{ mt: 2, px: 3 }}>
              <AppRoutes />
            </Box>
              <Footer />
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
