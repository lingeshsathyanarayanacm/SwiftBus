import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Snackbar, Alert, Chip } from '@mui/material';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const offers = [
  {
    id: 1,
    code: 'FIRSTBUS',
    title: 'First Trip Special',
    discount: '25% OFF',
    maxDiscount: 'Up to ₹200',
    validTill: 'Valid till end of month',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  },
  {
    id: 2,
    code: 'SWIFT100',
    title: 'Weekend Getaway',
    discount: '₹100 OFF',
    maxDiscount: 'Min booking ₹500',
    validTill: 'Limited Period',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
  },
  {
    id: 3,
    code: 'FESTIVE',
    title: 'Festive Holiday Pass',
    discount: '15% OFF',
    maxDiscount: 'Up to ₹150',
    validTill: 'All Volvo Routes',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    id: 4,
    code: 'LUXURY',
    title: 'AC Sleeper Saver',
    discount: '20% OFF',
    maxDiscount: 'Up to ₹300',
    validTill: 'Mercedes & Volvo',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
];

const TrendingOffersMui = () => {
  const { isDarkMode, setAppliedCoupon } = useBooking();
  const [copiedCode, setCopiedCode] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (offer) => {
    navigator.clipboard.writeText(offer.code);
    setCopiedCode(offer.code);
    setAppliedCoupon({ code: offer.code, discount: 100 });
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item key={offer.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(99,102,241,0.08)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                background: isDarkMode ? '#1e293b' : '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: isDarkMode ? '0 15px 35px rgba(0,0,0,0.7)' : '0 15px 35px rgba(99,102,241,0.18)',
                },
              }}
            >
              {/* Card Banner Header */}
              <div
                style={{
                  background: offer.gradient,
                  padding: '20px',
                  color: '#ffffff',
                  position: 'relative',
                }}
              >
                <Chip
                  label={offer.discount}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    fontWeight: '800',
                    backdropFilter: 'blur(4px)',
                    marginBottom: '8px',
                  }}
                />
                <Typography variant="h6" fontWeight="700" sx={{ fontSize: '18px', lineHeight: 1.2 }}>
                  {offer.title}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', marginTop: '4px' }}>
                  {offer.maxDiscount}
                </Typography>
              </div>

              {/* Card Body */}
              <CardContent sx={{ padding: '20px' }}>
                <Typography
                  variant="caption"
                  sx={{ color: isDarkMode ? '#94a3b8' : '#64748b', display: 'block', marginBottom: '12px' }}
                >
                  {offer.validTill}
                </Typography>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px dashed #6366f1',
                    backgroundColor: isDarkMode ? 'rgba(99,102,241,0.1)' : '#f5f3ff',
                  }}
                >
                  <span style={{ fontWeight: '700', letterSpacing: '1px', color: '#6366f1', fontSize: '14px' }}>
                    {offer.code}
                  </span>
                  <Button
                    size="small"
                    onClick={() => handleCopy(offer)}
                    sx={{
                      minWidth: 'auto',
                      padding: '4px 8px',
                      color: '#6366f1',
                      fontWeight: '600',
                      textTransform: 'none',
                    }}
                  >
                    {copiedCode === offer.code ? <FaCheck style={{ color: '#10b981' }} /> : <FaCopy />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          Coupon code <strong>{copiedCode}</strong> copied & applied!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrendingOffersMui;
