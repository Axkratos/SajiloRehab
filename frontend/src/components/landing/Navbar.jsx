import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { X } from "lucide-react";
import logo from "../../assets/logo.png"; // Assuming you want to keep the logo

const ResponsiveNavbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  
  const accessToken = localStorage.getItem('token'); // Check for accessToken

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();  // Clear all localStorage contents
    navigate('/login');  // Redirect to login page after logout
  };

  // Menu items with conditional pricing/dashboard link based on login status
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Chat', path: '/chat' },
    { label: accessToken ? 'Dashboard' : 'Pricing', path: accessToken ? '/dashboard' : '/price' },
    { label: 'Exercise', path: '/exercise' }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <img src={logo} alt="SajiloRehab Logo" className="h-10 w-10 mr-2" />
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: 'none', md: 'block' },
              fontWeight: 700,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            SajiloRehab
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, ml: 2 }}>
          {menuItems.map(({ label, path }, index) => (
            <Button
              key={index}
              onClick={() => { navigate(path); }}
              sx={{ 
                color: 'white', 
                ml: 3, 
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* User Avatar or Sign In/Sign Up */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {accessToken ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/2.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleCloseUserMenu(); }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/login')} 
                sx={{ color: 'white', mr: 2 }}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')} 
                sx={{ 
                  background: 'linear-gradient(to right, rgba(255, 87, 34, 1), rgba(255, 138, 101, 1))',
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(255, 138, 101, 0.8)',
                  }
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
          <IconButton onClick={toggleNavbar} color="inherit">
            {mobileDrawerOpen ? <X /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      
      {/* Mobile Navigation Drawer */}
{mobileDrawerOpen && (
  <Box
    sx={{
      position: 'absolute',
      top: 60,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
    }}
  >
    {menuItems.map(({ label, path }, index) => (
      <Button
        key={index}
        onClick={() => { navigate(path); toggleNavbar(); }}
        sx={{ 
          color: 'white',
          my: 2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        {label}
      </Button>
    ))}

    {/* Show Avatar if signed in, otherwise show Sign In / Sign Up buttons */}
    <Box sx={{ display: 'flex', mt: 2 }}>
      {accessToken ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/2.png" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button 
            onClick={() => { navigate('/login'); toggleNavbar(); }} 
            sx={{ color: 'white', mr: 2 }}
          >
            Sign In
          </Button>
          <Button 
            onClick={() => { navigate('/signup'); toggleNavbar(); }} 
            sx={{ 
              background: 'linear-gradient(to right, rgba(255, 87, 34, 1), rgba(255, 138, 101, 1))',
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 138, 101, 0.8)',
              }
            }}
          >
            Get Started
          </Button>
        </>
      )}
    </Box>
  </Box>
)}

    </AppBar>
  );
};

export default ResponsiveNavbar;
