import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link } from 'react-router-dom';
import { BookingProvider, useBooking } from './context/BookingContext';
import { FaBus, FaTicketAlt, FaUser, FaSun, FaMoon, FaSignOutAlt, FaPhoneAlt, FaInfoCircle, FaCompass } from 'react-icons/fa';
import HomePage from './HomePage';
import BusList from './BusList';
import SeatSelection from './Seat';
import PaymentComponent from './PaymentComponent';
import Paysuc from './paysuc';
import BusTicket from './booked';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ContactComponent from './contact';
import About from './about';
import TrendingOffersMui from './cards';

const NavigationBar = () => {
  const { user, logout, isDarkMode, toggleTheme } = useBooking();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        background: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxHeight: '70px',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
            }}
          >
            <FaBus style={{ fontSize: '20px' }} />
          </div>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }} className="gradient-text">
              SwiftBus
            </span>
            <span style={{ fontSize: '10px', display: 'block', color: isDarkMode ? '#94a3b8' : '#64748b', fontWeight: '600', marginTop: '-3px' }}>
              PREMIUM TRAVEL
            </span>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#6366f1' : isDarkMode ? '#cbd5e1' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              transition: 'all 0.2s ease',
            })}
          >
            <FaCompass /> Home
          </NavLink>

          <NavLink
            to="/ticket"
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#6366f1' : isDarkMode ? '#cbd5e1' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              transition: 'all 0.2s ease',
            })}
          >
            <FaTicketAlt /> My Ticket
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#6366f1' : isDarkMode ? '#cbd5e1' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              transition: 'all 0.2s ease',
            })}
          >
            <FaInfoCircle /> About
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#6366f1' : isDarkMode ? '#cbd5e1' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              transition: 'all 0.2s ease',
            })}
          >
            <FaPhoneAlt /> Contact
          </NavLink>
        </div>

        {/* User & Theme Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
              border: 'none',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDarkMode ? '#fbbf24' : '#6366f1',
              fontSize: '18px',
              transition: 'all 0.2s ease',
            }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                }}
              >
                <FaUser style={{ color: '#6366f1' }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{user.email || user.username || 'Traveler'}</span>
              </div>
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="gradient-btn" style={{ fontSize: '14px', padding: '8px 18px' }}>
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NavigationBar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buslist" element={<BusList />} />
              <Route path="/seat" element={<SeatSelection />} />
              <Route path="/payy" element={<PaymentComponent />} />
              <Route path="/paysuc" element={<Paysuc />} />
              <Route path="/ticket" element={<BusTicket />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactComponent />} />
              <Route path="/cards" element={<TrendingOffersMui />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookingProvider>
  );
};

export default App;
