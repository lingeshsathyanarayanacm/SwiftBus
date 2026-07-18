import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBus, FaShieldAlt, FaHeadset, FaMapMarkedAlt } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const Footer = () => {
  const { isDarkMode } = useBooking();

  return (
    <footer
      style={{
        backgroundColor: isDarkMode ? '#0b1329' : '#0f172a',
        color: '#94a3b8',
        paddingTop: '60px',
        paddingBottom: '40px',
        marginTop: '80px',
        borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <FaBus style={{ fontSize: '18px' }} />
              </div>
              <Typography variant="h6" fontWeight="800" style={{ color: '#ffffff' }}>
                SwiftBus
              </Typography>
            </div>
            <Typography variant="body2" style={{ lineHeight: 1.7, marginBottom: '20px' }}>
              Leading luxury bus ticket booking platform in India. Search routes, select seats in real-time, track your journey live, and travel with top-rated operators.
            </Typography>
            <div style={{ display: 'flex', gap: '10px' }}>
              <IconButton href="#" size="small" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff' }}>
                <FaFacebook />
              </IconButton>
              <IconButton href="#" size="small" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff' }}>
                <FaTwitter />
              </IconButton>
              <IconButton href="#" size="small" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff' }}>
                <FaInstagram />
              </IconButton>
              <IconButton href="#" size="small" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff' }}>
                <FaLinkedin />
              </IconButton>
            </div>
          </Grid>

          {/* Top Routes */}
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="700" style={{ color: '#ffffff', marginBottom: '20px' }}>
              Top Bus Routes
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <Link href="/buslist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Coimbatore to Hosur</Link>
              <Link href="/buslist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Chennai to Bangalore</Link>
              <Link href="/buslist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Salem to Chennai</Link>
              <Link href="/buslist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Madurai to Coimbatore</Link>
              <Link href="/buslist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Hyderabad to Bangalore</Link>
            </div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="700" style={{ color: '#ffffff', marginBottom: '20px' }}>
              Support & Info
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <Link href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About SwiftBus</Link>
              <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Customer Support 24/7</Link>
              <Link href="/ticket" style={{ color: '#94a3b8', textDecoration: 'none' }}>Manage Booking / Cancel</Link>
              <Link href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
          </Grid>

          {/* Trust Highlights */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="700" style={{ color: '#ffffff', marginBottom: '20px' }}>
              Why Travel With Us?
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaShieldAlt style={{ color: '#6366f1', fontSize: '18px' }} />
                <span>100% Safe & Instant Refund Policy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaMapMarkedAlt style={{ color: '#10b981', fontSize: '18px' }} />
                <span>Live GPS Bus Location Tracking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaHeadset style={{ color: '#ec4899', fontSize: '18px' }} />
                <span>Dedicated Priority Assistance</span>
              </div>
            </div>
          </Grid>
        </Grid>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.08)', margin: '40px 0 24px 0' }} />

        <Typography variant="body2" style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          © {new Date().getFullYear()} Lingeshsathyanarayana CM. All rights reserved. SwiftBus Luxury Travel Solutions.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
