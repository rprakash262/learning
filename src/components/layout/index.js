import { useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, Button, Menu, Tooltip, Avatar, Container, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import '../../App.css';
import { Home } from '../../routes/Home';
import { Courses } from '../../routes/Courses';
import { TestSeries } from '../../routes/TestSeries';
import { Blogs } from '../../routes/Blogs';
import { Login } from '../../routes/Login';
import { SnackBar } from '../snackbar';
import { useAuth } from '../../auth';
import { authApi } from '../../api/auth';

const pages = ['home', 'courses', 'test-series', 'blogs'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block', textDecoration: "none" }}
                  >
                    <Link style={{ textDecoration: "none", }} to={`/${page}`}>{page}</Link>
                    {/* {page} */}
                  </Button>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: "none" }}
                >
                  <Link style={{ textDecoration: "none", color: "#fff" }} to={`/${page}`}>{page}</Link>
                  {/* {page} */}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings"> */}
                {user ? (
                  <IconButton onClick={authApi.signOut} sx={{ p: 0 }}>
                    <Typography>Logout</Typography>
                  </IconButton>
                ) : (
                  <Link style={{ textDecoration: "none", color: "#fff" }} to="/login">
                    <Typography>Login</Typography>
                  </Link>
                )}
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton> */}
              {/* </Tooltip> */}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div
        className="scrollbar"
        style={{
          width: "100%",
          height: "calc(100% - 69px)",
          overflowY: "scroll"
        }}
      >
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="test-series" element={<TestSeries />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      <SnackBar />
    </div>
  );
}