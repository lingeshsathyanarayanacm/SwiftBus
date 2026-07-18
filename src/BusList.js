import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  FaBus,
  FaStar,
  FaFilter,
  FaSnowflake,
  FaBed,
  FaLock,
} from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const sampleBuses = [
  {
    id: 1,
    operator: 'IntrCity SmartBus',
    busType: 'Volvo Multi-Axle A/C Sleeper (2+1)',
    brand: 'Volvo',
    departureTime: '21:30',
    arrivalTime: '03:45',
    duration: '6h 15m',
    rating: 4.8,
    reviewsCount: 342,
    price: 750,
    isAC: true,
    isSleeper: true,
    liveTrackingUrl: 'https://maps.google.com',
    amenities: ['WiFi', 'Power Sockets', 'Blanket', 'Water Bottle'],
  },
  {
    id: 2,
    operator: 'KPR Travels',
    busType: 'Mercedes-Benz A/C Seater (2+2)',
    brand: 'Mercedes',
    departureTime: '22:00',
    arrivalTime: '04:15',
    duration: '6h 15m',
    rating: 4.5,
    reviewsCount: 210,
    price: 550,
    isAC: true,
    isSleeper: false,
    liveTrackingUrl: 'https://maps.google.com',
    amenities: ['WiFi', 'Power Sockets', 'Water Bottle'],
  },
  {
    id: 3,
    operator: 'SRS Travels',
    busType: 'Non-A/C Sleeper (2+1)',
    brand: 'Ashok Leyland',
    departureTime: '22:45',
    arrivalTime: '05:30',
    duration: '6h 45m',
    rating: 4.1,
    reviewsCount: 156,
    price: 450,
    isAC: false,
    isSleeper: true,
    liveTrackingUrl: 'https://maps.google.com',
    amenities: ['Blanket', 'Reading Light'],
  },
  {
    id: 4,
    operator: 'Sharma Transports',
    busType: 'Scania Multi-Axle Luxury A/C Sleeper',
    brand: 'Scania',
    departureTime: '23:15',
    arrivalTime: '05:45',
    duration: '6h 30m',
    rating: 4.9,
    reviewsCount: 520,
    price: 890,
    isAC: true,
    isSleeper: true,
    liveTrackingUrl: 'https://maps.google.com',
    amenities: ['WiFi', 'Power Sockets', 'Pillow', 'Blanket', 'Water Bottle'],
  },
];

const BusList = () => {
  const navigate = useNavigate();
  const {
    searchCriteria,
    setSelectedBus,
    setSelectedSeats,
    getBookedSeatsForBus,
    user,
    isDarkMode,
  } = useBooking();

  const [acFilter, setAcFilter] = useState('ALL'); // ALL, AC, NON_AC
  const [typeFilter, setTypeFilter] = useState('ALL'); // ALL, SLEEPER, SEATER
  const [sortBy, setSortBy] = useState('RATING'); // RATING, PRICE_LOW, PRICE_HIGH, DEPARTURE

  const handleSelectSeats = (bus) => {
    // Check if user is logged in
    if (!user) {
      alert('Please log in or sign up to book tickets.');
      setSelectedBus(bus);
      setSelectedSeats([]); // Reset seats for new bus
      navigate('/login', { state: { from: '/seat' } });
      return;
    }

    // Reset selected seats when switching buses
    setSelectedSeats([]);
    setSelectedBus(bus);
    navigate('/seat');
  };

  // Filter logic
  const filteredBuses = sampleBuses.filter((bus) => {
    if (acFilter === 'AC' && !bus.isAC) return false;
    if (acFilter === 'NON_AC' && bus.isAC) return false;
    if (typeFilter === 'SLEEPER' && !bus.isSleeper) return false;
    if (typeFilter === 'SEATER' && bus.isSleeper) return false;
    return true;
  });

  // Sort logic
  filteredBuses.sort((a, b) => {
    if (sortBy === 'PRICE_LOW') return a.price - b.price;
    if (sortBy === 'PRICE_HIGH') return b.price - a.price;
    if (sortBy === 'RATING') return b.rating - a.rating;
    if (sortBy === 'DEPARTURE') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Route Header Banner */}
        <Paper
          sx={{
            padding: '24px',
            borderRadius: '20px',
            marginBottom: '32px',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Typography variant="h5" fontWeight="800">
                {searchCriteria.from} ➔ {searchCriteria.to}
              </Typography>
              <Chip label={`${filteredBuses.length} Buses Found`} color="primary" size="small" sx={{ fontWeight: '700' }} />
            </div>
            <Typography variant="body2" color="textSecondary">
              Date: <strong>{searchCriteria.date}</strong> | Real-time Seat Availability
            </Typography>
          </div>

          <Button variant="outlined" onClick={() => navigate('/')} sx={{ borderRadius: '12px', textTransform: 'none' }}>
            Modify Search
          </Button>
        </Paper>

        {/* Filters & Sorting Controls */}
        <Paper
          sx={{
            padding: '16px 24px',
            borderRadius: '16px',
            marginBottom: '24px',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <FaFilter style={{ color: '#6366f1' }} />
            <Typography variant="subtitle2" fontWeight="700" sx={{ marginRight: '8px' }}>
              Filters:
            </Typography>
            <Chip
              label="All AC"
              color={acFilter === 'ALL' ? 'primary' : 'default'}
              onClick={() => setAcFilter('ALL')}
              clickable
            />
            <Chip
              icon={<FaSnowflake />}
              label="AC Only"
              color={acFilter === 'AC' ? 'primary' : 'default'}
              onClick={() => setAcFilter('AC')}
              clickable
            />
            <Chip
              label="Non-AC"
              color={acFilter === 'NON_AC' ? 'primary' : 'default'}
              onClick={() => setAcFilter('NON_AC')}
              clickable
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Chip
              icon={<FaBed />}
              label="Sleeper"
              color={typeFilter === 'SLEEPER' ? 'primary' : 'default'}
              onClick={() => setTypeFilter(typeFilter === 'SLEEPER' ? 'ALL' : 'SLEEPER')}
              clickable
            />
            <Chip
              icon={<FaBus />}
              label="Seater"
              color={typeFilter === 'SEATER' ? 'primary' : 'default'}
              onClick={() => setTypeFilter(typeFilter === 'SEATER' ? 'ALL' : 'SEATER')}
              clickable
            />
          </div>

          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="caption" fontWeight="600" color="textSecondary">
              Sort By:
            </Typography>
            <Button
              size="small"
              variant={sortBy === 'RATING' ? 'contained' : 'text'}
              onClick={() => setSortBy('RATING')}
              sx={{ borderRadius: '8px' }}
            >
              Rating
            </Button>
            <Button
              size="small"
              variant={sortBy === 'PRICE_LOW' ? 'contained' : 'text'}
              onClick={() => setSortBy('PRICE_LOW')}
              sx={{ borderRadius: '8px' }}
            >
              Price: Low
            </Button>
            <Button
              size="small"
              variant={sortBy === 'DEPARTURE' ? 'contained' : 'text'}
              onClick={() => setSortBy('DEPARTURE')}
              sx={{ borderRadius: '8px' }}
            >
              Departure
            </Button>
          </div>
        </Paper>

        {/* Bus Cards List */}
        <Grid container spacing={3}>
          {filteredBuses.map((bus) => {
            const bookedSeats = getBookedSeatsForBus(bus.id);
            const availableCount = Math.max(0, 30 - bookedSeats.length);

            return (
              <Grid item key={bus.id} xs={12}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: isDarkMode ? '0 15px 35px rgba(0,0,0,0.4)' : '0 15px 35px rgba(99,102,241,0.12)',
                      borderColor: '#6366f1',
                    },
                  }}
                >
                  <CardContent sx={{ padding: '28px !important' }}>
                    <Grid container spacing={3} alignItems="center">
                      {/* Bus Operator Info */}
                      <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <Typography variant="h6" fontWeight="800">
                            {bus.operator}
                          </Typography>
                          <Chip
                            icon={<FaStar style={{ color: '#ffffff', fontSize: '12px' }} />}
                            label={bus.rating}
                            size="small"
                            sx={{
                              backgroundColor: '#10b981',
                              color: '#ffffff',
                              fontWeight: '800',
                              height: '24px',
                            }}
                          />
                        </div>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '12px' }}>
                          {bus.busType}
                        </Typography>

                        {/* Amenities */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {bus.amenities.map((item, idx) => (
                            <Chip key={idx} label={item} size="small" variant="outlined" sx={{ borderRadius: '6px', fontSize: '11px' }} />
                          ))}
                        </div>
                      </Grid>

                      {/* Departure / Arrival Timeline */}
                      <Grid item xs={12} sm={7} md={5}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* Departure */}
                          <div>
                            <Typography variant="h5" fontWeight="800">
                              {bus.departureTime}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" fontWeight="600">
                              {searchCriteria.from}
                            </Typography>
                          </div>

                          {/* Duration Indicator */}
                          <div style={{ textAlign: 'center', padding: '0 16px' }}>
                            <Typography variant="caption" color="primary" fontWeight="700">
                              {bus.duration}
                            </Typography>
                            <div
                              style={{
                                width: '100px',
                                height: '2px',
                                backgroundColor: '#6366f1',
                                margin: '4px 0',
                                position: 'relative',
                              }}
                            >
                              <div
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: '#6366f1',
                                  position: 'absolute',
                                  top: '-3px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                }}
                              />
                            </div>
                            <Typography variant="caption" color="textSecondary">
                              Direct Trip
                            </Typography>
                          </div>

                          {/* Arrival */}
                          <div>
                            <Typography variant="h5" fontWeight="800">
                              {bus.arrivalTime}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" fontWeight="600">
                              {searchCriteria.to}
                            </Typography>
                          </div>
                        </div>
                      </Grid>

                      {/* Pricing & CTA */}
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        md={3}
                        sx={{
                          textAlign: { xs: 'left', md: 'right' },
                          borderLeft: { md: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9' },
                          paddingLeft: { md: '24px' },
                        }}
                      >
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                          Starts from
                        </Typography>
                        <Typography variant="h4" fontWeight="800" color="primary" sx={{ marginBottom: '4px' }}>
                          ₹{bus.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: availableCount < 10 ? '#ef4444' : '#10b981',
                            fontWeight: '700',
                            display: 'block',
                            marginBottom: '16px',
                          }}
                        >
                          {availableCount} Seats Left (Bus #{bus.id})
                        </Typography>

                        <Button
                          onClick={() => handleSelectSeats(bus)}
                          fullWidth
                          className="gradient-btn"
                          sx={{ textTransform: 'none', borderRadius: '12px' }}
                          startIcon={!user ? <FaLock style={{ fontSize: '14px' }} /> : null}
                        >
                          {user ? 'Select Seats' : 'Login to Book'}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default BusList;
