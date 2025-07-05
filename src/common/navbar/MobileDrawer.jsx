import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircle from '@mui/icons-material/AccountCircle';

const MobileDrawer = ({ open, onClose, user, userType, handleLogout, navigate }) => {
    const getUserName = () =>
        user?.username || user?.data?.name || user?.email?.split('@')[0] || 'Profile';
    const theme = useTheme();
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ p: 2, width: 250 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                    {!user ? (
                        <>
                            <ListItem button component={Link} to="/login" onClick={onClose}>
                                <ListItemIcon><LoginIcon /></ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button component={Link} to="/signup" onClick={onClose}>
                                <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <ListItemIcon><AccountCircle /></ListItemIcon>
                                <ListItemText primary={getUserName()} />
                            </ListItem>
                            {userType === 'admin' && (
                                <>
                                    <ListItem button onClick={() => { navigate('/profile/admin'); onClose(); }}>
                                        <ListItemText primary="Profile" />
                                    </ListItem>
                                    <ListItem button onClick={() => { navigate('/users'); onClose(); }}>
                                        <ListItemText primary="All Users" />
                                    </ListItem>
                                    <ListItem button onClick={() => { navigate('/roles'); onClose(); }}>
                                        <ListItemText primary="Roles" />
                                    </ListItem>
                                </>
                            )}
                            {userType === 'tenant' && (
                                <ListItem button onClick={() => { navigate('/profile/user'); onClose(); }}>
                                    <ListItemText primary="Profile" />
                                </ListItem>
                            )}
                            <ListItem button onClick={() => { handleLogout(); onClose(); }}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default MobileDrawer;
