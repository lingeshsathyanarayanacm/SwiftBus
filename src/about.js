import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box, Chip, Paper } from '@mui/material';
import { FaCode, FaRocket, FaHeart, FaAward, FaBus } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';

const teamMembers = [
  {
    name: 'Lingeshsathyanarayana CM',
    role: 'Founder & Chief Architect',
    email: 'lingeshsathyanarayana.cm@swiftbus.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Visionary engineer & full-stack architect leading the mission to revolutionize inter-city bus travel across India with state-of-the-art Web and React technologies.',
    featured: true,
  },
  {
    name: 'SwiftBus Tech Team',
    role: 'Product & UX Design',
    email: 'tech@swiftbus.com',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    bio: 'Crafting responsive, secure, and user-centric booking interfaces with instant E-Ticket distribution.',
    featured: false,
  },
  {
    name: 'SwiftBus Operations',
    role: 'Fleet & Partner Relations',
    email: 'ops@swiftbus.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing 3,500+ verified luxury bus operators and 24/7 passenger emergency response systems.',
    featured: false,
  },
];

const About = () => {
  const { isDarkMode } = useBooking();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Heading */}
      <Box style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Chip
          icon={<FaBus style={{ color: '#6366f1' }} />}
          label="Engineered by Lingeshsathyanarayana CM"
          sx={{ mb: 2, fontWeight: 700, backgroundColor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)', color: '#6366f1' }}
        />
        <Typography variant="h3" fontWeight="800" gutterBottom>
          About <span className="gradient-text">SwiftBus</span>
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: '750px', margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}>
          Founded and built by <strong>Lingeshsathyanarayana CM</strong>, SwiftBus is dedicated to delivering a luxury, reliable, and hassle-free bus booking platform for travelers across India.
        </Typography>
      </Box>

      {/* Featured Creator Spotlight */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 6,
          borderRadius: '24px',
          background: isDarkMode
            ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)',
          border: isDarkMode ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Avatar
              src={teamMembers[0].image}
              alt="Lingeshsathyanarayana CM"
              sx={{
                width: '160px',
                height: '160px',
                margin: '0 auto',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)',
                border: '4px solid #6366f1',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Chip label="Founder & Lead Architect" color="primary" size="small" sx={{ fontWeight: 700, mb: 1 }} />
            <Typography variant="h4" fontWeight="800" gutterBottom>
              Lingeshsathyanarayana CM
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: isDarkMode ? '#cbd5e1' : '#334155', mb: 3 }}>
              Hello! I am <strong>Lingeshsathyanarayana CM</strong>, the creator and lead architect behind SwiftBus. My passion lies in building intuitive, ultra-fast web applications that empower users. SwiftBus was envisioned to simplify highway passenger transport through real-time seat selection, instant ticketing, transparent pricing, and robust digital integration.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaCode style={{ color: '#6366f1' }} />
                  <Typography variant="body2" fontWeight="600">Full-Stack React</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaRocket style={{ color: '#10b981' }} />
                  <Typography variant="body2" fontWeight="600">High Speed Booking</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaAward style={{ color: '#f59e0b' }} />
                  <Typography variant="body2" fontWeight="600">Premium Standard</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Leadership & Organization */}
      <Typography variant="h5" fontWeight="800" align="center" sx={{ mb: 4 }}>
        Meet Our Team & Organization
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
                textAlign: 'center',
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: '90px', height: '90px', margin: '0 auto 16px auto', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" fontWeight="700">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" fontWeight="600" sx={{ mb: 1 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </div>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
                {member.email}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
