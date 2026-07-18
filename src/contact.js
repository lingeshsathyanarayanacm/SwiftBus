import React, { useState } from 'react';
import { Typography, Container, Grid, Paper, TextField, Button, Alert } from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const ContactComponent = () => {
  const { isDarkMode } = useBooking();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="800" align="center" gutterBottom>
        Get in Touch With <span className="gradient-text">SwiftBus Support</span>
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
        Have questions about your bus ticket or cancellation? Our 24/7 team is ready to assist.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#e0e7ff',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                <FaPhoneAlt />
              </div>
              <div>
                <Typography variant="subtitle2" fontWeight="700">
                  Toll-Free Support
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  1800-419-5555 (24/7)
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#fce7f3',
                  color: '#ec4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                <FaEnvelope />
              </div>
              <div>
                <Typography variant="subtitle2" fontWeight="700">
                  Email Support
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  support@swiftbus.com
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#d1fae5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                <FaMapMarkerAlt />
              </div>
              <div>
                <Typography variant="subtitle2" fontWeight="700">
                  Headquarters
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SwiftBus Tower, MG Road, Tech Hub
                </Typography>
              </div>
            </Paper>
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              padding: '32px',
              borderRadius: '20px',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            }}
          >
            <Typography variant="h6" fontWeight="800" gutterBottom>
              Send Us a Message
            </Typography>

            {submitted ? (
              <Alert severity="success" sx={{ borderRadius: '12px', my: 2 }}>
                Thank you! Your message has been received. Our support agent will reach out within 15 minutes.
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Full Name" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email Address" type="email" required />
                  </Grid>
                </Grid>
                <TextField fullWidth label="PNR / Ticket Number (Optional)" />
                <TextField fullWidth label="Your Message / Query" multiline rows={4} required />
                <Button
                  type="submit"
                  className="gradient-btn"
                  sx={{ borderRadius: '12px', py: '12px', width: '200px' }}
                  endIcon={<FaPaperPlane />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactComponent;
