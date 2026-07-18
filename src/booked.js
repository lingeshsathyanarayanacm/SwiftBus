import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Divider, Grid, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { FaBus, FaPrint, FaArrowLeft, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import { sendTicketEmail } from './emailService';

const BusTicket = () => {
  const navigate = useNavigate();
  const { isDarkMode, user } = useBooking();

  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
  const [sending, setSending] = useState(false);

  const storedData = localStorage.getItem('last_booking');
  const ticket = storedData
    ? JSON.parse(storedData)
    : {
        bookingId: 'SWIFT894120',
        bus: { operator: 'IntrCity SmartBus', busType: 'Volvo Multi-Axle AC Sleeper', number: 'KA-01-F-9921' },
        route: { from: 'Coimbatore', to: 'Hosur' },
        seats: ['3A'],
        fare: 650,
        contactEmail: user?.email || '',
        passengerName: user?.username || 'Jane Doe',
        departureTime: '10:30 PM',
        arrivalTime: '05:45 AM',
        date: '2026-07-20'
      };

  const [targetEmail, setTargetEmail] = useState(ticket.contactEmail || user?.email || '');

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    setSending(true);
    const res = await sendTicketEmail({
      toEmail: targetEmail,
      passengerName: ticket.passengerName || user?.username || 'Passenger',
      bookingId: ticket.bookingId,
      busName: ticket.bus?.operator || 'SwiftBus Express',
      seats: ticket.seats,
      fare: ticket.fare,
      route: `${ticket.route?.from || 'Origin'} -> ${ticket.route?.to || 'Destination'}`
    });
    setSending(false);
    setEmailDialogOpen(false);
    setEmailSuccessMsg(res.message);
  };

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh' }}>
      <Container maxWidth="md">
        {/* Top Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <Button
            onClick={() => navigate('/')}
            startIcon={<FaArrowLeft />}
            sx={{ textTransform: 'none', fontWeight: '600' }}
          >
            Back to Home
          </Button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              onClick={() => setEmailDialogOpen(true)}
              variant="outlined"
              startIcon={<FaEnvelope />}
              sx={{ borderRadius: '12px', textTransform: 'none' }}
            >
              Email Ticket
            </Button>
            <Button
              onClick={handlePrint}
              variant="contained"
              className="gradient-btn"
              startIcon={<FaPrint />}
              sx={{ borderRadius: '12px' }}
            >
              Print / Save PDF Ticket
            </Button>
          </div>
        </div>

        {/* E-Ticket Card Container */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
          }}
        >
          {/* Ticket Header Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              padding: '28px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                }}
              >
                <FaBus />
              </div>
              <div>
                <Typography variant="h6" fontWeight="800">
                  {ticket.bus?.operator || 'IntrCity SmartBus'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {ticket.bus?.busType || 'Volvo AC Sleeper'}
                </Typography>
              </div>
            </div>

            <div>
              <Chip
                icon={<FaCheckCircle style={{ color: '#ffffff' }} />}
                label="CONFIRMED"
                sx={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontWeight: '800',
                  padding: '6px 4px',
                }}
              />
              <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'right', marginTop: '4px' }}>
                PNR: <strong>{ticket.bookingId}</strong>
              </Typography>
            </div>
          </div>

          {/* Email Destination Notification Ribbon */}
          <div
            style={{
              padding: '10px 32px',
              backgroundColor: isDarkMode ? 'rgba(99,102,241,0.15)' : '#e0e7ff',
              color: isDarkMode ? '#cbd5e1' : '#3730a3',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <FaEnvelope style={{ color: '#6366f1' }} />
            <span>Ticket dispatched to: <strong>{ticket.contactEmail || user?.email || 'Not Provided'}</strong></span>
          </div>

          {/* Ticket Body Content */}
          <div style={{ padding: '32px' }}>
            {/* Route & Times */}
            <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={12} sm={5}>
                <Typography variant="caption" color="textSecondary" fontWeight="600">
                  BOARDING POINT
                </Typography>
                <Typography variant="h5" fontWeight="800">
                  {ticket.route?.from || 'Coimbatore'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Main Bus Stand, Platform 4 | 09:30 PM
                </Typography>
              </Grid>

              <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                >
                  ➔
                </div>
              </Grid>

              <Grid item xs={12} sm={5} sx={{ textAlign: { sm: 'right' } }}>
                <Typography variant="caption" color="textSecondary" fontWeight="600">
                  DROPPING POINT
                </Typography>
                <Typography variant="h5" fontWeight="800">
                  {ticket.route?.to || 'Hosur'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Hosur Bus Stop, Bypass | 03:45 AM
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

            {/* Passenger & Seat Details Table */}
            <Typography variant="subtitle1" fontWeight="800" gutterBottom>
              Passenger Information
            </Typography>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                      color: '#94a3b8',
                      fontSize: '13px',
                    }}
                  >
                    <th style={{ padding: '8px 0' }}>Passenger Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Seat Number</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket.passengers && ticket.passengers.length > 0 ? (
                    ticket.passengers.map((p, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f1f5f9',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                      >
                        <td style={{ padding: '12px 0' }}>{p.name || 'Traveler'}</td>
                        <td>{p.age || '25'}</td>
                        <td>{p.gender || 'Male'}</td>
                        <td style={{ color: '#6366f1', fontWeight: '800' }}>{p.seat || ticket.seats[idx] || '3A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ fontSize: '14px', fontWeight: '600' }}>
                      <td style={{ padding: '12px 0' }}>Primary Traveler</td>
                      <td>28</td>
                      <td>Male</td>
                      <td style={{ color: '#6366f1', fontWeight: '800' }}>{ticket.seats ? ticket.seats.join(', ') : '3A'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

            {/* Footer Ticket QR & Policy */}
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  • Please arrive at the boarding point 15 minutes prior to departure.
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  • Government issued photo ID proof is mandatory for all passengers during travel.
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                  • 24/7 Helpline: 1800-419-5555 | Email: support@swiftbus.com
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: '12px',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'inline-block',
                  }}
                >
                  <img
                    src="https://pngimg.com/uploads/qr_code/qr_code_PNG25.png"
                    alt="Boarding QR"
                    style={{ width: '100px', height: '100px', display: 'block' }}
                  />
                  <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: '700', fontSize: '10px' }}>
                    SCAN TO BOARD
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Paper>

        {/* Send Email Modal */}
        <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
          <DialogTitle fontWeight="700">Email E-Ticket Confirmation</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enter destination email address to send a copy of your ticket for PNR <strong>{ticket.bookingId}</strong>.
            </Typography>
            <TextField
              fullWidth
              label="Recipient Email"
              type="email"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setEmailDialogOpen(false)} disabled={sending}>Cancel</Button>
            <Button onClick={handleSendEmail} variant="contained" className="gradient-btn" disabled={sending}>
              {sending ? 'Sending...' : 'Send Email'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={Boolean(emailSuccessMsg)}
          autoHideDuration={4000}
          onClose={() => setEmailSuccessMsg('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" sx={{ borderRadius: '12px' }}>
            {emailSuccessMsg}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default BusTicket;
