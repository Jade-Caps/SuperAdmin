import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Tooltip,
    Collapse
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard,
    People,
    Settings,
    Logout,
    ExpandLess,
    ExpandMore
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginState } from '../../api/login/loginSlice';
import { useTheme } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';

const drawerWidth = 220;

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, userType } = useSelector((state) => state.login);

    const toggleDrawer = () => setOpen(!open);
    const toggleSettings = () => setSettingsOpen(!settingsOpen);

    const handleLogout = () => {
        dispatch(clearLoginState());
        navigate('/login');
    };

    if (!isLoggedIn) return null;

    const menuItems = [
        {
            label: 'Dashboard',
            icon: <Dashboard />,
            path: '/dashboard',
            roles: ['admin', 'tenant']
        },
        {
            label: 'Users',
            icon: <People />,
            path: '/users',
            roles: ['admin']
        },
        {
            label: 'Roles',
            icon: <AdminPanelSettingsIcon />,
            path: '/roles',
            roles: ['admin']
        },
        {
            label: 'Logs',
            icon: <HistoryIcon />,
            path: '/logs',
            roles: ['admin']
        },
    ];

    const getSettingsItems = (userType) => [
        {
            label: 'Profile',
            path: userType === 'admin' ? '/profile/admin' : '/profile/user',
            roles: ['admin', 'tenant']
        },
        {
            label: 'Security',
            path: '/settings/security',
            roles: ['admin', 'tenant']
        }
    ];



    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? drawerWidth : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : 60,
                        backgroundColor: theme.palette.background.dark,
                        color: theme.palette.text.primary,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                        borderRight: '1px solid rgba(255,255,255,0.1)'
                    }
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={open ? 'space-between' : 'center'}
                    px={2}
                    py={2}
                >
                    {open && (
                        <Box sx={{ fontWeight: 600 }}>
                            {userType === 'tenant' ? 'User Panel' : 'Admin Panel'}
                        </Box>
                    )}
                    <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>


                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                <List>
                    {menuItems
                        .filter((item) => item.roles.includes(userType))
                        .map((item) => (
                            <Tooltip key={item.label} title={!open ? item.label : ''} placement="right">
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate(item.path)}>
                                        <ListItemIcon
                                            sx={{
                                                color: 'inherit',
                                                minWidth: 0,
                                                mr: open ? 2 : 'auto',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        {open && <ListItemText primary={item.label} />}
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        ))}

                    {/* Collapsible Settings */}
                    {['admin', 'tenant'].includes(userType) && (
                        <>
                            <Tooltip title={!open ? 'Settings' : ''} placement="right">
                                <ListItem disablePadding>
                                    <ListItemButton onClick={toggleSettings}>
                                        <ListItemIcon
                                            sx={{
                                                color: 'inherit',
                                                minWidth: 0,
                                                mr: open ? 2 : 'auto',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Settings />
                                        </ListItemIcon>
                                        {open && <ListItemText primary="Settings" />}
                                        {open && (settingsOpen ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>

                            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {getSettingsItems(userType)
                                        .filter((item) => item.roles.includes(userType))
                                        .map((item) => (
                                            <ListItemButton
                                                key={item.label}
                                                sx={{ pl: open ? 4 : 2 }}
                                                onClick={() => navigate(item.path)}
                                            >
                                                <ListItemText primary={item.label} />
                                            </ListItemButton>
                                        ))}

                                </List>
                            </Collapse>
                        </>
                    )}
                </List>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mt: 'auto' }} />

                <ListItem disablePadding sx={{ mt: 1 }}>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon
                            sx={{
                                color: 'inherit',
                                minWidth: 0,
                                mr: open ? 2 : 'auto',
                                justifyContent: 'center'
                            }}
                        >
                            <Logout />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" />}
                    </ListItemButton>
                </ListItem>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
