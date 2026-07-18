import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Alert,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { FaCreditCard, FaQrcode, FaUniversity, FaLock, FaTag, FaBus, FaEnvelope } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const PaymentComponent = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    searchCriteria,
    selectedSeats,
    passengers,
    appliedCoupon,
    setAppliedCoupon,
    blockSeatsForBus,
    calculateTotal,
    user,
    isDarkMode,
  } = useBooking();

  const [paymentTab, setPaymentTab] = useState(0); // 0 = Card, 1 = UPI/QR, 2 = NetBanking
  const [couponInput, setCouponInput] = useState('');
  const [couponSuccessMsg, setCouponSuccessMsg] = useState('');
  const [contactEmail, setContactEmail] = useState(() => user?.email || '');

  // Card Form state
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const pricePerSeat = selectedBus ? selectedBus.price : 650;
  const grandTotal = calculateTotal(pricePerSeat);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (couponInput.toUpperCase() === 'FIRSTBUS' || couponInput.toUpperCase() === 'SWIFT100') {
      setAppliedCoupon({ code: couponInput.toUpperCase(), discount: 100 });
      setCouponSuccessMsg(`Promo code "${couponInput.toUpperCase()}" applied successfully! You saved ₹100.`);
    } else {
      alert('Invalid Promo Code. Try "FIRSTBUS" or "SWIFT100".');
    }
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to complete payment.');
      navigate('/login', { state: { from: '/payy' } });
      return;
    }

    const busId = selectedBus ? selectedBus.id : 1;

    // Permanently block booked seats for this specific bus
    if (selectedSeats && selectedSeats.length) {
      blockSeatsForBus(busId, selectedSeats);
    }

    // Save ticket confirmation details
    const bookingId = 'SWIFT' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem(
      'last_booking',
      JSON.stringify({
        bookingId,
        contactEmail: contactEmail || user?.email || '',
        bus: selectedBus || { id: 1, operator: 'IntrCity SmartBus', busType: 'Volvo AC Sleeper' },
        route: searchCriteria,
        seats: selectedSeats.length ? selectedSeats : ['3A'],
        passengers: passengers.length ? passengers : [{ name: 'Traveler', age: '25', gender: 'Male' }],
        amountPaid: grandTotal,
        bookingDate: new Date().toLocaleDateString(),
      })
    );

    navigate('/paysuc');
  };

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="800" gutterBottom align="center">
          Secure Payment Gateway
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          <FaLock style={{ color: '#10b981', marginRight: '6px' }} />
          256-Bit SSL Encrypted & Guaranteed Instant Confirmation
        </Typography>

        <Grid container spacing={4}>
          {/* Left Side: Payment Tabs & Input Forms */}
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
              <Tabs
                value={paymentTab}
                onChange={(e, v) => setPaymentTab(v)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{ mb: 3 }}
              >
                <Tab icon={<FaCreditCard />} label="Credit/Debit Card" sx={{ fontWeight: '700', textTransform: 'none' }} />
                <Tab icon={<FaQrcode />} label="UPI / QR Code" sx={{ fontWeight: '700', textTransform: 'none' }} />
                <Tab icon={<FaUniversity />} label="Net Banking" sx={{ fontWeight: '700', textTransform: 'none' }} />
              </Tabs>

              {/* Tab 0: Credit / Debit Card */}
              {paymentTab === 0 && (
                <form onSubmit={handleProcessPayment}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Card Number"
                        placeholder="4532 •••• •••• 8921"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaCreditCard style={{ color: '#6366f1' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Expiry Date (MM/YY)"
                        placeholder="08/28"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="password"
                        label="CVV Code"
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Cardholder Full Name"
                        placeholder="As written on card"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    className="gradient-btn"
                    sx={{ borderRadius: '14px', py: '14px', fontSize: '16px', mt: 3 }}
                  >
                    Pay ₹{grandTotal} Now
                  </Button>
                </form>
              )}

              {/* Tab 1: UPI / QR Code */}
              {paymentTab === 1 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Scan QR Code via Google Pay, PhonePe, or Paytm
                  </Typography>
                  <div
                    style={{
                      padding: '16px',
                      background: '#ffffff',
                      borderRadius: '16px',
                      display: 'inline-block',
                      margin: '16px 0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src="https://pngimg.com/uploads/qr_code/qr_code_PNG25.png"
                      alt="Payment QR"
                      style={{ width: '160px', height: '160px' }}
                    />
                  </div>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    Scan with any UPI App or enter your Virtual Payment Address below
                  </Typography>

                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={8}>
                      <TextField fullWidth placeholder="mobile-number@upi / gpay" label="Enter UPI ID" size="small" />
                    </Grid>
                  </Grid>

                  <Button
                    onClick={handleProcessPayment}
                    className="gradient-btn"
                    sx={{ borderRadius: '14px', py: '12px', px: '32px', mt: 3 }}
                  >
                    Verify & Pay ₹{grandTotal}
                  </Button>
                </div>
              )}

              {/* Tab 2: Net Banking */}
              {paymentTab === 2 && (
                <div style={{ padding: '10px 0' }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Select Your Preferred Bank
                  </Typography>
                  <TextField select fullWidth label="Choose Bank" defaultValue="HDFC">
                    <MenuItem value="HDFC">HDFC Bank</MenuItem>
                    <MenuItem value="SBI">State Bank of India (SBI)</MenuItem>
                    <MenuItem value="ICICI">ICICI Bank</MenuItem>
                    <MenuItem value="AXIS">Axis Bank</MenuItem>
                    <MenuItem value="KOTAK">Kotak Mahindra Bank</MenuItem>
                  </TextField>

                  <Button
                    onClick={handleProcessPayment}
                    fullWidth
                    className="gradient-btn"
                    sx={{ borderRadius: '14px', py: '14px', mt: 4 }}
                  >
                    Proceed to Bank Payment (₹{grandTotal})
                  </Button>
                </div>
              )}
            </Paper>

            {/* Promo Coupon Card */}
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '20px',
                marginTop: '24px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
              }}
            >
              <Typography variant="subtitle1" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 2 }}>
                <FaTag style={{ color: '#6366f1' }} /> Have a Promo Coupon?
              </Typography>

              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '12px' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter coupon (e.g. FIRSTBUS)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <Button type="submit" variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', whiteSpace: 'nowrap' }}>
                  Apply
                </Button>
              </form>

              {couponSuccessMsg && (
                <Alert severity="success" sx={{ borderRadius: '10px', mt: 2 }}>
                  {couponSuccessMsg}
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Right Side: Order Summary & Email Destination */}
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
                Trip & Booking Summary
              </Typography>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#e0e7ff',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaBus style={{ fontSize: '18px' }} />
                </div>
                <div>
                  <Typography variant="subtitle2" fontWeight="800">
                    {selectedBus ? selectedBus.operator : 'IntrCity SmartBus'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {selectedBus ? selectedBus.busType : 'Volvo A/C Sleeper'}
                  </Typography>
                </div>
              </div>

              <Divider sx={{ my: 2 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">Route</Typography>
                  <Typography variant="body2" fontWeight="700">{searchCriteria.from} ➔ {searchCriteria.to}</Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">Date</Typography>
                  <Typography variant="body2" fontWeight="700">{searchCriteria.date}</Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">Seats Chosen</Typography>
                  <Typography variant="body2" fontWeight="700" color="primary">
                    {selectedSeats.length ? selectedSeats.join(', ') : '3A'}
                  </Typography>
                </div>
              </div>

              <Divider sx={{ my: 2 }} />

              {/* Email Notification Field */}
              <Typography variant="subtitle2" fontWeight="700" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaEnvelope style={{ color: '#6366f1' }} /> E-Ticket Email Delivery
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                label="Email Address for E-Ticket"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                sx={{ mb: 2 }}
                helperText="Your confirmed digital PDF ticket & PNR will be sent here."
              />

              <Divider sx={{ my: 2 }} />

              {/* Price Calculation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Base Ticket Fare ({selectedSeats.length || 1} × ₹{pricePerSeat})
                  </Typography>
                  <Typography variant="body2" fontWeight="700">
                    ₹{(selectedSeats.length || 1) * pricePerSeat}
                  </Typography>
                </div>

                {appliedCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="success.main" fontWeight="600">
                      Discount ({appliedCoupon.code})
                    </Typography>
                    <Typography variant="body2" color="success.main" fontWeight="700">
                      -₹{appliedCoupon.discount}
                    </Typography>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">Taxes & Convenience Fee</Typography>
                  <Typography variant="body2" fontWeight="700" color="success.main">FREE</Typography>
                </div>

                <Divider sx={{ my: 1 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="800">Grand Total</Typography>
                  <Typography variant="h4" fontWeight="800" color="primary">
                    ₹{grandTotal}
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PaymentComponent;
