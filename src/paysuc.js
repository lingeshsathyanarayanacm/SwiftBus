import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { FaCheckCircle, FaTicketAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import { sendTicketEmail } from './emailService';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { isDarkMode, user } = useBooking();
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState('');

  const bookingData = JSON.parse(localStorage.getItem('last_booking') || '{}');
  const recipientEmail = bookingData.contactEmail || user?.email || '';

  useEffect(() => {
    const processEmail = async () => {
      const res = await sendTicketEmail({
        toEmail: recipientEmail,
        passengerName: bookingData.passengerName || user?.username || 'Passenger',
        bookingId: bookingData.bookingId || 'SWIFT894120',
        busName: bookingData.bus?.operator || 'SwiftBus Express',
        seats: bookingData.seats || ['3A'],
        fare: bookingData.amountPaid || '650',
        route: `${bookingData.route?.from || 'Coimbatore'} -> ${bookingData.route?.to || 'Hosur'}`
      });
      if (res && res.message) {
        setEmailStatus(res.message);
      }
    };

    processEmail();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
          }}
        >
          {loading ? (
            <div>
              <CircularProgress size={60} sx={{ color: '#6366f1', mb: 3 }} />
              <Typography variant="h5" fontWeight="700" gutterBottom>
                Processing Payment & Dispatching E-Ticket...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Securing your seats and sending confirmation email.
              </Typography>
            </div>
          ) : (
            <div>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#d1fae5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '42px',
                  margin: '0 auto 20px auto',
                }}
              >
                <FaCheckCircle />
              </div>

              <Typography variant="h4" fontWeight="800" gutterBottom sx={{ color: '#10b981' }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Booking ID: <strong>{bookingData.bookingId || 'SWIFT894120'}</strong>
              </Typography>

              <Alert
                icon={<FaEnvelope style={{ fontSize: '18px', color: '#6366f1' }} />}
                severity="success"
                sx={{ borderRadius: '14px', mb: 3, textAlign: 'left', backgroundColor: isDarkMode ? 'rgba(99,102,241,0.15)' : '#e0e7ff', color: isDarkMode ? '#f8fafc' : '#1e1b4b' }}
              >
                {emailStatus || `E-Ticket with PNR ${bookingData.bookingId || 'SWIFT894120'} has been sent to ${recipientEmail}`}
              </Alert>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                  marginBottom: '28px',
                  textAlign: 'left',
                }}
              >
                <Typography variant="subtitle2" fontWeight="700" color="primary" sx={{ mb: 1 }}>
                  Trip Details Summary
                </Typography>
                <Typography variant="body2">
                  <strong>Bus:</strong> {bookingData.bus?.operator || 'IntrCity SmartBus'} ({bookingData.bus?.busType || 'Volvo AC Sleeper'})
                </Typography>
                <Typography variant="body2">
                  <strong>Route:</strong> {bookingData.route?.from || 'Coimbatore'} ➔ {bookingData.route?.to || 'Hosur'}
                </Typography>
                <Typography variant="body2">
                  <strong>Seats:</strong> {bookingData.seats?.join(', ') || '3A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Amount Paid:</strong> ₹{bookingData.amountPaid || '650'}
                </Typography>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Button
                  onClick={() => navigate('/ticket')}
                  className="gradient-btn"
                  sx={{ borderRadius: '12px', px: '24px' }}
                  startIcon={<FaTicketAlt />}
                >
                  View & Print E-Ticket
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outlined"
                  sx={{ borderRadius: '12px', px: '20px', textTransform: 'none' }}
                  startIcon={<FaHome />}
                >
                  Home
                </Button>
              </div>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentStatus;
