import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid, Box, Alert } from '@mui/material';
import { FaGoogle, FaFacebook, FaLock, FaUser, FaBus } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import { signInWithGoogle, signInWithFacebook } from './firebase';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, isDarkMode } = useBooking();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const input = credentials.username.trim();
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    // Check if user exists in registered_users by username or email
    const matchedUser = existingUsers.find(
      (u) => u.username?.toLowerCase() === input.toLowerCase() || u.email?.toLowerCase() === input.toLowerCase()
    );

    let loggedUser;
    if (matchedUser) {
      loggedUser = {
        username: matchedUser.username,
        email: matchedUser.email,
        phone: matchedUser.phone,
      };
    } else {
      // Unregistered / demo login
      if (input.includes('@')) {
        loggedUser = {
          username: input.split('@')[0],
          email: input,
        };
      } else {
        loggedUser = {
          username: input,
          email: input,
        };
      }
    }

    setUser(loggedUser);
    
    const targetPath = location.state?.from || '/';
    navigate(targetPath);
  };

  const handleGoogleLogin = async () => {
    try {
      const userObj = await signInWithGoogle();
      if (userObj) {
        setUser(userObj);
        const targetPath = location.state?.from || '/';
        navigate(targetPath);
      }
    } catch (err) {
      setErrorMsg('Google Sign-In failed. Please try again.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const userObj = await signInWithFacebook();
      if (userObj) {
        setUser(userObj);
        const targetPath = location.state?.from || '/';
        navigate(targetPath);
      }
    } catch (err) {
      setErrorMsg('Facebook Sign-In failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          <Grid container>
            {/* Left Column: Visual Branding Banner */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#ffffff',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FaBus style={{ fontSize: '20px' }} />
                  </div>
                  <Typography variant="h6" fontWeight="800">
                    SwiftBus
                  </Typography>
                </div>
                <Typography variant="h4" fontWeight="800" gutterBottom sx={{ lineHeight: 1.2 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                  Login with Google or Facebook to view your active bus bookings and access priority seat booking.
                </Typography>
              </div>

              <div style={{ marginTop: '40px' }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  © {new Date().getFullYear()} SwiftBus Travel Services
                </Typography>
              </div>
            </Grid>

            {/* Right Column: Form */}
            <Grid item xs={12} md={7} sx={{ padding: '40px' }}>
              <Typography variant="h5" fontWeight="800" gutterBottom>
                Sign In to Account
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Enter your credentials or use social single sign-on
              </Typography>

              {errorMsg && (
                <Alert severity="error" sx={{ borderRadius: '12px', mb: 3 }}>
                  {errorMsg}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Username or Email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <FaUser style={{ marginRight: '10px', color: '#94a3b8' }} />,
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <FaLock style={{ marginRight: '10px', color: '#94a3b8' }} />,
                    }}
                  />
                </Box>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                  <Link to="#" style={{ color: '#6366f1', fontSize: '13px', fontWeight: '600' }}>
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  className="gradient-btn"
                  sx={{ borderRadius: '14px', py: '12px', fontSize: '16px', mb: 3 }}
                >
                  Sign In
                </Button>

                <div style={{ textAlign: 'center', margin: '16px 0', position: 'relative' }}>
                  <Typography variant="caption" color="textSecondary">
                    OR CONTINUE WITH
                  </Typography>
                </div>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<FaGoogle style={{ color: '#ea4335' }} />}
                      onClick={handleGoogleLogin}
                      sx={{ borderRadius: '12px', textTransform: 'none', py: '10px' }}
                    >
                      Google
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<FaFacebook style={{ color: '#1877f2' }} />}
                      onClick={handleFacebookLogin}
                      sx={{ borderRadius: '12px', textTransform: 'none', py: '10px' }}
                    >
                      Facebook
                    </Button>
                  </Grid>
                </Grid>

                <Typography variant="body2" align="center" color="textSecondary">
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ color: '#6366f1', fontWeight: '700' }}>
                    Sign Up Now
                  </Link>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
