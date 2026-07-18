import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Card,
  Chip,
  Box,
} from '@mui/material';
import { FaBus, FaExchangeAlt, FaCalendarAlt, FaShieldAlt, FaMapMarkerAlt, FaClock, FaStar, FaHeadset } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import TrendingOffersMui from './cards';
import About from './about';
import ContactComponent from './contact';
import Footer from './footer';

const popularCities = [
  'Coimbatore',
  'Hosur',
  'Salem',
  'Chennai',
  'Bangalore',
  'Madurai',
  'Trichy',
  'Hyderabad',
];

const HomePage = () => {
  const navigate = useNavigate();
  const { searchCriteria, setSearchCriteria, isDarkMode } = useBooking();

  const [fromCity, setFromCity] = useState(searchCriteria.from || 'Coimbatore');
  const [toCity, setToCity] = useState(searchCriteria.to || 'Hosur');
  const [journeyDate, setJourneyDate] = useState(searchCriteria.date || new Date().toISOString().split('T')[0]);

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleQuickDate = (daysToAdd) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setJourneyDate(d.toISOString().split('T')[0]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromCity === toCity) {
      alert('"From" and "To" locations cannot be the same city.');
      return;
    }
    setSearchCriteria({
      from: fromCity,
      to: toCity,
      date: journeyDate,
    });
    navigate('/buslist');
  };

  const handleQuickRouteSearch = (from, to) => {
    setFromCity(from);
    setToCity(to);
    setSearchCriteria({
      from,
      to,
      date: journeyDate,
    });
    navigate('/buslist');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle at 50% 20%, #1e1b4b 0%, #0f172a 100%)'
            : 'radial-gradient(circle at 50% 10%, #e0e7ff 0%, #f8fafc 70%)',
          padding: '60px 0 90px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<FaStar style={{ color: '#f59e0b' }} />}
                label="India's Most Preferred Bus Booking App"
                sx={{
                  backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
                  color: '#6366f1',
                  fontWeight: '700',
                  padding: '6px 8px',
                  marginBottom: '20px',
                  borderRadius: '999px',
                }}
              />
              <Typography
                variant="h2"
                fontWeight="800"
                sx={{
                  fontSize: { xs: '32px', md: '52px' },
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  color: isDarkMode ? '#f8fafc' : '#0f172a',
                  marginBottom: '20px',
                }}
              >
                Book Bus Tickets Online with <span className="gradient-text">Zero Booking Fees</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '18px',
                  color: isDarkMode ? '#94a3b8' : '#475569',
                  marginBottom: '30px',
                  maxWidth: '560px',
                }}
              >
                Choose from over 3,500+ bus operators, Luxury Volvo AC Sleepers, and enjoy real-time seat tracking and instant refunds.
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://img.freepik.com/free-vector/tourist-bus-concept-illustration_114360-7834.jpg"
                alt="Modern Bus Travel"
                sx={{
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
              />
            </Grid>
          </Grid>

          {/* Floating Search Widget */}
          <Paper
            className="glass-card"
            elevation={0}
            sx={{
              marginTop: { xs: '30px', md: '-30px' },
              padding: { xs: '20px', md: '32px' },
              position: 'relative',
              zIndex: 10,
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
            }}
          >
            <form onSubmit={handleSearch}>
              <Grid container spacing={2} alignItems="center">
                {/* From Location */}
                <Grid item xs={12} sm={5} md={3.5}>
                  <TextField
                    select
                    fullWidth
                    label="From City"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <FaMapMarkerAlt style={{ marginRight: '10px', color: '#6366f1' }} />,
                    }}
                  >
                    {popularCities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Swap Icon */}
                <Grid item xs={12} sm={2} md={1} sx={{ textAlign: 'center' }}>
                  <IconButton
                    onClick={handleSwapCities}
                    sx={{
                      backgroundColor: '#6366f1',
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                      '&:hover': { backgroundColor: '#4f46e5' },
                    }}
                  >
                    <FaExchangeAlt />
                  </IconButton>
                </Grid>

                {/* To Location */}
                <Grid item xs={12} sm={5} md={3.5}>
                  <TextField
                    select
                    fullWidth
                    label="To City"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <FaMapMarkerAlt style={{ marginRight: '10px', color: '#ec4899' }} />,
                    }}
                  >
                    {popularCities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Journey Date */}
                <Grid item xs={12} sm={8} md={2.5}>
                  <TextField
                    type="date"
                    fullWidth
                    label="Journey Date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <FaCalendarAlt style={{ marginRight: '10px', color: '#10b981' }} />,
                    }}
                  />
                </Grid>

                {/* Search Button */}
                <Grid item xs={12} sm={4} md={1.5}>
                  <Button
                    type="submit"
                    fullWidth
                    className="gradient-btn"
                    sx={{ height: '56px', fontSize: '16px' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>

              {/* Quick Date Shortcuts */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
                <Typography variant="caption" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontWeight: '600' }}>
                  Quick Selection:
                </Typography>
                <Chip
                  label="Today"
                  size="small"
                  onClick={() => handleQuickDate(0)}
                  clickable
                  sx={{ borderRadius: '8px' }}
                />
                <Chip
                  label="Tomorrow"
                  size="small"
                  onClick={() => handleQuickDate(1)}
                  clickable
                  sx={{ borderRadius: '8px' }}
                />
                <Chip
                  label="In 3 Days"
                  size="small"
                  onClick={() => handleQuickDate(3)}
                  clickable
                  sx={{ borderRadius: '8px' }}
                />
              </div>
            </form>
          </Paper>
        </Container>
      </div>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ marginTop: '60px' }}>
        <Grid container spacing={3}>
          {[
            { icon: <FaShieldAlt />, title: '100% Safe Travel', desc: 'All buses disinfected & verified operators only.' },
            { icon: <FaClock />, title: 'Live GPS Tracking', desc: 'Share your live bus location with friends & family.' },
            { icon: <FaBus />, title: 'Luxury Sleeper & AC', desc: 'Widest range of Volvo Multi-axle luxury buses.' },
            { icon: <FaHeadset />, title: '24/7 Priority Support', desc: 'Instant cancellation refunds & phone support.' },
          ].map((feature, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  padding: '24px',
                  borderRadius: '16px',
                  height: '100%',
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : '#e0e7ff',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    margin: '0 auto 16px auto',
                  }}
                >
                  {feature.icon}
                </div>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Offers */}
      <Container maxWidth="lg" sx={{ marginTop: '80px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Trending Offers & Discounts
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Save extra on your bus bookings with guaranteed promo codes
          </Typography>
        </div>
        <TrendingOffersMui />
      </Container>

      {/* Popular Routes */}
      <Container maxWidth="lg" sx={{ marginTop: '80px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Popular Bus Routes
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Top requested routes with frequent daily departures
          </Typography>
        </div>
        <Grid container spacing={2}>
          {[
            { from: 'Coimbatore', to: 'Hosur', buses: '42+ Buses', price: '₹499' },
            { from: 'Chennai', to: 'Bangalore', buses: '85+ Buses', price: '₹599' },
            { from: 'Salem', to: 'Chennai', buses: '38+ Buses', price: '₹450' },
            { from: 'Madurai', to: 'Coimbatore', buses: '29+ Buses', price: '₹380' },
          ].map((route, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <Paper
                onClick={() => handleQuickRouteSearch(route.from, route.to)}
                sx={{
                  padding: '20px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: '#6366f1',
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="700">
                  {route.from} ➔ {route.to}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                  <Chip label={route.buses} size="small" variant="outlined" />
                  <Typography variant="subtitle2" fontWeight="800" color="primary">
                    Starting {route.price}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Embedded About & Contact */}
      <Container maxWidth="lg" sx={{ marginTop: '80px' }}>
        <Paper
          sx={{
            padding: '40px',
            borderRadius: '24px',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          }}
        >
          <div id="about-section">
            <About />
          </div>
          <div id="contact-section" style={{ marginTop: '60px' }}>
            <ContactComponent />
          </div>
        </Paper>
      </Container>

      <Footer />
    </div>
  );
};

export default HomePage;
