import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/jadecapslogo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DesktopActions from './DesktopAction';
import MobileDrawer from './MobileDrawer';
import { clearLoginState } from '../../api/login/loginSlice';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userType } = useSelector((state) => state.login);

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleLogout = () => {
    dispatch(clearLoginState());
    navigate('/login');
  };

  return (
    <AppBar
  position="static"
  sx={{
    backgroundColor: theme.palette.background.dark,
  }}
>
  <Toolbar
    sx={{
      justifyContent: 'space-between',
      px: 2,
      py: 1.5, // Add vertical padding instead of fixed height
    }}
  >
    <Box
      component="img"
      src={Logo}
      alt="Jadecaps"
      sx={{
        display: 'block',
        maxHeight: 50, // ensures it stays within the Toolbar’s height
        cursor: 'pointer',
      }}
      onClick={() => navigate('/')}
    />

    {!isMobile ? (
      <DesktopActions
        user={user}
        userType={userType}
        anchorEl={menuAnchor}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    ) : (
      <>
        <IconButton
          sx={{
            color: theme.palette.text.primary,
            p: 1, // smaller padding for touch target
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={user}
          userType={userType}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      </>
    )}
  </Toolbar>
</AppBar>

  );
};

export default Navbar;
