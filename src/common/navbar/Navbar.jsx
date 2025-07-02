import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/jadecapslogo.png';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { clearLoginState } from '../../api/login/loginSlice';

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userType } = useSelector((state) => state.login);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(clearLoginState());
    navigate('/login');
  };

  const getUserName = () => {
    return (
      user?.username ||
      user?.data?.name ||
      user?.email?.split('@')[0] ||
      'Profile'
    );
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.dark,
        height: 80,
        justifyContent: 'center'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            component="img"
            src={Logo}
            alt="Company Logo"
            sx={{
              height: 50,
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => navigate('/')}
          />
        </Box>

        {/* Right Side Buttons */}
        <Box display="flex" gap={2}>
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
                    backgroundColor: theme.palette.background.main,
                    color: theme.palette.text.primary,
                    borderRadius: 1,
                    mt: 1,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                {userType === 'admin' && (
                  <>
                  <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/profile/admin');
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/users');
                      }}
                    >
                      All Users
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/roles');
                      }}
                    >
                      Roles
                    </MenuItem>
                  </>
                )}

                {userType === 'tenant' && (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/profile/user');
                      }}
                    >
                      Profile
                    </MenuItem>
                  </>
                )}

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
