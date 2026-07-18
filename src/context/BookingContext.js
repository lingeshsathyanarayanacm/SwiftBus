import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const initialDefaultBooked = {
  1: ['1A', '2B', '4C'],
  2: ['2A', '3C', '5A'],
  3: ['1B', '4B', '6C'],
  4: ['3A', '7B', '9C'],
};

export const BookingProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState(() => {
    const saved = localStorage.getItem('bus_search_criteria');
    return saved ? JSON.parse(saved) : { from: 'Coimbatore', to: 'Hosur', date: new Date().toISOString().split('T')[0] };
  });

  const [selectedBus, setSelectedBus] = useState(() => {
    const saved = localStorage.getItem('selected_bus');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedSeats, setSelectedSeats] = useState(() => {
    const saved = localStorage.getItem('selected_seats');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookedSeatsByBus, setBookedSeatsByBus] = useState(() => {
    const saved = localStorage.getItem('booked_seats_by_bus');
    return saved ? JSON.parse(saved) : initialDefaultBooked;
  });

  const [passengers, setPassengers] = useState(() => {
    const saved = localStorage.getItem('passenger_details');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('bus_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('bus_search_criteria', JSON.stringify(searchCriteria));
  }, [searchCriteria]);

  useEffect(() => {
    if (selectedBus) {
      localStorage.setItem('selected_bus', JSON.stringify(selectedBus));
    }
  }, [selectedBus]);

  useEffect(() => {
    localStorage.setItem('selected_seats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    localStorage.setItem('booked_seats_by_bus', JSON.stringify(bookedSeatsByBus));
  }, [bookedSeatsByBus]);

  useEffect(() => {
    localStorage.setItem('passenger_details', JSON.stringify(passengers));
  }, [passengers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bus_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bus_theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const blockSeatsForBus = (busId, newSeats) => {
    if (!busId || !newSeats || !newSeats.length) return;
    setBookedSeatsByBus((prev) => {
      const existing = prev[busId] || [];
      const updated = Array.from(new Set([...existing, ...newSeats]));
      return { ...prev, [busId]: updated };
    });
  };

  const getBookedSeatsForBus = (busId) => {
    if (!busId) return [];
    return bookedSeatsByBus[busId] || [];
  };

  const calculateTotal = (pricePerSeat = selectedBus ? selectedBus.price : 650) => {
    const baseTotal = selectedSeats.length * pricePerSeat;
    const discount = appliedCoupon ? appliedCoupon.discount : 0;
    return Math.max(0, baseTotal - discount);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <BookingContext.Provider
      value={{
        searchCriteria,
        setSearchCriteria,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        bookedSeatsByBus,
        blockSeatsForBus,
        getBookedSeatsForBus,
        passengers,
        setPassengers,
        appliedCoupon,
        setAppliedCoupon,
        user,
        setUser,
        logout,
        isDarkMode,
        toggleTheme,
        calculateTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
