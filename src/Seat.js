import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Box,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import { FaCheck, FaLock } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { useBooking } from './context/BookingContext';

// Seat layout rows
const lowerDeckSeats = [
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C'],
  ['3A', '3B', '3C'],
  ['4A', '4B', '4C'],
  ['5A', '5B', '5C'],
];

const upperDeckSeats = [
  ['6A', '6B', '6C'],
  ['7A', '7B', '7C'],
  ['8A', '8B', '8C'],
  ['9A', '9B', '9C'],
  ['10A', '10B', '10C'],
];

const ladiesSeatsList = ['3A', '3B', '8C'];

const SeatSelection = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    searchCriteria,
    selectedSeats,
    setSelectedSeats,
    getBookedSeatsForBus,
    setPassengers,
    calculateTotal,
    user,
    isDarkMode,
  } = useBooking();

  const [activeDeck, setActiveDeck] = useState(0); // 0 = Lower Deck, 1 = Upper Deck

  // Get current bus's specific booked / blocked seats
  const busId = selectedBus ? selectedBus.id : 1;
  const currentBusBookedSeats = getBookedSeatsForBus(busId);

  const [passengerForms, setPassengerForms] = useState(() => {
    return selectedSeats.map((seat) => ({
      seat,
      name: '',
      gender: 'Male',
      age: '',
    }));
  });

  // Ensure passenger forms sync with selected seats
  useEffect(() => {
    setPassengerForms((prev) => {
      return selectedSeats.map((seat) => {
        const existing = prev.find((p) => p.seat === seat);
        return existing || { seat, name: '', gender: 'Male', age: '' };
      });
    });
  }, [selectedSeats]);

  const pricePerSeat = selectedBus ? selectedBus.price : 650;

  const handleSeatClick = (seatId) => {
    // Check if user is logged in
    if (!user) {
      alert('Please log in or sign up to select seats and book tickets.');
      navigate('/login', { state: { from: '/seat' } });
      return;
    }

    if (currentBusBookedSeats.includes(seatId)) return;

    let updatedSeats;
    if (selectedSeats.includes(seatId)) {
      updatedSeats = selectedSeats.filter((s) => s !== seatId);
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select a maximum of 6 seats per booking.');
        return;
      }
      updatedSeats = [...selectedSeats, seatId];
    }

    setSelectedSeats(updatedSeats);
  };

  const handlePassengerChange = (seatId, field, value) => {
    setPassengerForms((prev) =>
      prev.map((p) => (p.seat === seatId ? { ...p, [field]: value } : p))
    );
  };

  const handleProceedToPayment = () => {
    if (!user) {
      alert('Please log in or sign up to proceed.');
      navigate('/login', { state: { from: '/seat' } });
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to proceed.');
      return;
    }

    // Validate passenger details
    for (const p of passengerForms) {
      if (!p.name.trim()) {
        alert(`Please enter passenger name for Seat ${p.seat}.`);
        return;
      }
    }

    setPassengers(passengerForms);
    navigate('/payy');
  };

  const renderSeat = (seatId) => {
    const isBooked = currentBusBookedSeats.includes(seatId);
    const isLadies = ladiesSeatsList.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    let bgColor = isDarkMode ? '#334155' : '#ffffff';
    let borderColor = isDarkMode ? '#475569' : '#cbd5e1';
    let textColor = isDarkMode ? '#f8fafc' : '#1e293b';

    if (isBooked) {
      bgColor = isDarkMode ? '#1e293b' : '#cbd5e1';
      borderColor = isDarkMode ? '#334155' : '#94a3b8';
      textColor = '#64748b';
    } else if (isSelected) {
      bgColor = '#6366f1';
      borderColor = '#4f46e5';
      textColor = '#ffffff';
    } else if (isLadies) {
      bgColor = isDarkMode ? 'rgba(236, 72, 153, 0.2)' : '#fce7f3';
      borderColor = '#f472b6';
      textColor = '#db2777';
    }

    return (
      <button
        key={seatId}
        disabled={isBooked}
        onClick={() => handleSeatClick(seatId)}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          color: textColor,
          fontWeight: '700',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isBooked ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isSelected ? '0 6px 16px rgba(99, 102, 241, 0.4)' : 'none',
          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
        }}
        title={isBooked ? `Seat ${seatId} is Booked` : `Select Seat ${seatId}`}
      >
        <span>{seatId}</span>
        {isBooked ? (
          <span style={{ fontSize: '9px', textTransform: 'uppercase' }}>Blocked</span>
        ) : isSelected ? (
          <FaCheck style={{ fontSize: '10px', marginTop: '2px' }} />
        ) : null}
      </button>
    );
  };

  const currentDeckLayout = activeDeck === 0 ? lowerDeckSeats : upperDeckSeats;

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Summary Banner */}
        <Paper
          sx={{
            padding: '20px 28px',
            borderRadius: '20px',
            marginBottom: '32px',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography variant="h5" fontWeight="800">
                {selectedBus ? selectedBus.operator : 'IntrCity SmartBus'}
              </Typography>
              <Chip label={`Bus #${busId}`} size="small" color="secondary" />
            </div>
            <Typography variant="body2" color="textSecondary" sx={{ mt: '4px' }}>
              {searchCriteria.from} ➔ {searchCriteria.to} | {searchCriteria.date}
            </Typography>
          </div>
          <Chip
            label={`₹${pricePerSeat} / Seat`}
            color="primary"
            sx={{ fontWeight: '800', fontSize: '15px', padding: '6px 8px' }}
          />
        </Paper>

        {!user && (
          <Alert severity="warning" sx={{ borderRadius: '14px', mb: 3 }}>
            <FaLock style={{ marginRight: '6px' }} /> You are currently browsing as a guest. Please log in to complete your seat booking.
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Left Column: Seat Map */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                padding: '28px',
                borderRadius: '24px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              }}
            >
              {/* Deck Selector Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '24px' }}>
                <Tabs value={activeDeck} onChange={(e, v) => setActiveDeck(v)} centered color="primary">
                  <Tab label="Lower Deck (Seater)" sx={{ fontWeight: '700' }} />
                  <Tab label="Upper Deck (Sleeper)" sx={{ fontWeight: '700' }} />
                </Tabs>
              </Box>

              {/* Legend Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '32px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
                      backgroundColor: isDarkMode ? '#334155' : '#ffffff',
                    }}
                  />
                  <Typography variant="caption" fontWeight="600">Available</Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: '#6366f1',
                    }}
                  />
                  <Typography variant="caption" fontWeight="600">Selected</Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isDarkMode ? '#1e293b' : '#cbd5e1',
                    }}
                  />
                  <Typography variant="caption" fontWeight="600">Blocked / Booked</Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: '#fce7f3',
                      border: '1px solid #f472b6',
                    }}
                  />
                  <Typography variant="caption" fontWeight="600">Ladies</Typography>
                </div>
              </div>

              {/* Bus Interior Layout Container */}
              <div
                style={{
                  border: isDarkMode ? '2px dashed rgba(255,255,255,0.15)' : '2px dashed #cbd5e1',
                  borderRadius: '20px',
                  padding: '30px',
                  maxWidth: '360px',
                  margin: '0 auto',
                  backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                }}
              >
                {/* Driver Cabin */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingBottom: '20px',
                    marginBottom: '20px',
                    borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                  }}
                >
                  <Tooltip title="Driver Cabin">
                    <div>
                      <GiSteeringWheel style={{ fontSize: '32px', color: '#94a3b8' }} />
                    </div>
                  </Tooltip>
                </div>

                {/* Seat Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentDeckLayout.map((row, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {renderSeat(row[0])}
                        {renderSeat(row[1])}
                      </div>

                      {/* Aisle Spacer */}
                      <div style={{ width: '30px', textAlign: 'center' }}>
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>R{rIdx + 1}</span>
                      </div>

                      <div>{renderSeat(row[2])}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Paper>
          </Grid>

          {/* Right Column: Passenger Info & Price Summary */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                padding: '28px',
                borderRadius: '24px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              }}
            >
              <Typography variant="h6" fontWeight="800" gutterBottom>
                Selected Seats & Passengers
              </Typography>

              {selectedSeats.length === 0 ? (
                <Alert severity="info" sx={{ borderRadius: '12px', my: 2 }}>
                  Click on any available seat on the deck layout to select it for Bus #{busId}.
                </Alert>
              ) : (
                <>
                  {/* Selected Seats Chips */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {selectedSeats.map((seat) => (
                      <Chip
                        key={seat}
                        label={`Seat ${seat}`}
                        color="primary"
                        onDelete={() => handleSeatClick(seat)}
                        sx={{ fontWeight: '700' }}
                      />
                    ))}
                  </div>

                  {/* Passenger Details Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                    {passengerForms.map((p, idx) => (
                      <Paper
                        key={p.seat}
                        elevation={0}
                        sx={{
                          padding: '16px',
                          borderRadius: '14px',
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                          border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="700" color="primary" sx={{ marginBottom: '10px' }}>
                          Passenger {idx + 1} (Seat {p.seat})
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Full Name"
                              value={p.name}
                              onChange={(e) => handlePassengerChange(p.seat, 'name', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Age"
                              type="number"
                              value={p.age}
                              onChange={(e) => handlePassengerChange(p.seat, 'age', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <RadioGroup
                              row
                              value={p.gender}
                              onChange={(e) => handlePassengerChange(p.seat, 'gender', e.target.value)}
                            >
                              <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                              <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                            </RadioGroup>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </div>

                  <Divider sx={{ my: 2 }} />

                  {/* Price Summary Breakup */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="textSecondary">
                        Base Fare ({selectedSeats.length} × ₹{pricePerSeat})
                      </Typography>
                      <Typography variant="body2" fontWeight="700">
                        ₹{selectedSeats.length * pricePerSeat}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="textSecondary">
                        Taxes & Service Fees
                      </Typography>
                      <Typography variant="body2" fontWeight="700" color="success.main">
                        FREE
                      </Typography>
                    </div>
                    <Divider sx={{ my: 1 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="800">
                        Total Payable
                      </Typography>
                      <Typography variant="h5" fontWeight="800" color="primary">
                        ₹{calculateTotal(pricePerSeat)}
                      </Typography>
                    </div>
                  </div>

                  <Button
                    onClick={handleProceedToPayment}
                    fullWidth
                    className="gradient-btn"
                    sx={{ borderRadius: '14px', py: '14px', fontSize: '16px' }}
                  >
                    Proceed to Payment
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SeatSelection;
