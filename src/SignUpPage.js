import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { FaBus, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import { signInWithGoogle, signInWithFacebook } from './firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, isDarkMode } = useBooking();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const newUser = { username: formData.username, email: formData.email, phone: formData.phone };
    
    // Persist to registered users list in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userExists = existingUsers.some(
      (u) => u.username?.toLowerCase() === formData.username.toLowerCase() || u.email?.toLowerCase() === formData.email.toLowerCase()
    );
    
    if (userExists) {
      setErrorMsg('An account with this username or email already exists. Please login.');
      return;
    }
    
    existingUsers.push({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));

    setUser(newUser);
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
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
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
                  Join SwiftBus Today
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                  Create an account or sign in with Google/Facebook to receive instant digital E-Ticket confirmations directly in your inbox.
                </Typography>
              </div>

              <div style={{ marginTop: '40px' }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Fast & Secure Firebase Registration
                </Typography>
              </div>
            </Grid>

            {/* Right Column: Registration Form */}
            <Grid item xs={12} md={7} sx={{ padding: '40px' }}>
              <Typography variant="h5" fontWeight="800" gutterBottom>
                Create an Account
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Enter your details to register as a new member
              </Typography>

              {errorMsg && (
                <Alert severity="error" sx={{ borderRadius: '12px', mb: 3 }}>
                  {errorMsg}
                </Alert>
              )}

              <form onSubmit={handleSignUp}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  className="gradient-btn"
                  sx={{ borderRadius: '14px', py: '14px', fontSize: '16px', mt: 3, mb: 2 }}
                >
                  Register Account
                </Button>

                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                  <Typography variant="caption" color="textSecondary">
                    OR SIGN UP WITH
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
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#6366f1', fontWeight: '700' }}>
                    Sign In Here
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

export default SignUp;
