import React from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem, useTheme,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const DesktopActions = ({
    user,
    userType,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    navigate,

}) => {
    const getUserName = () =>
        user?.username || user?.data?.name || user?.email?.split('@')[0] || 'Profile';
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center" gap={2}>
            {!user ? (
                <>
                    <Button
                        variant="whiteOutlined"
                        startIcon={<LoginIcon />}
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="whiteOutlined"
                        startIcon={<PersonAddIcon />}
                        component={Link}
                        to="/signup"
                    >
                        Sign Up
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="whiteOutlined"
                        onClick={handleMenuOpen}
                        startIcon={<AccountCircle />}
                    >
                        {getUserName()}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                backgroundColor: theme.palette.background.dark, // or .main — whichever you want!
                                color: theme.palette.text.primary, // also keep text visible
                                borderRadius: 1,
                                mt: 1,
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        {userType === 'admin' && (
                            <>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/profile/admin'); }}>Profile</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/users'); }}>All Users</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/roles'); }}>Roles</MenuItem>
                            </>
                        )}
                        {userType === 'tenant' && (
                            <MenuItem onClick={() => { handleMenuClose(); navigate('/profile/user'); }}>Profile</MenuItem>
                        )}
                        <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
                    </Menu>

                </>
            )}
        </Box>
    );
};

export default DesktopActions;
