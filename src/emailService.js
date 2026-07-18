// Utility to handle real email sending via EmailJS REST API or backend fallback
export const sendTicketEmail = async ({ toEmail, passengerName, bookingId, busName, seats, fare, route }) => {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials not configured in .env. Simulating email delivery.");
    return {
      success: true,
      simulated: true,
      message: `[Simulated] E-Ticket (PNR: ${bookingId}) sent to ${toEmail}. Add EmailJS credentials in .env for real email delivery.`
    };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: toEmail,
          passenger_name: passengerName || 'Valued Passenger',
          booking_id: bookingId,
          bus_name: busName || 'Express Bus',
          seats: Array.isArray(seats) ? seats.join(', ') : seats,
          total_fare: fare || '0',
          route: route || 'N/A'
        }
      })
    });

    if (response.ok) {
      return {
        success: true,
        simulated: false,
        message: `Real E-Ticket for PNR ${bookingId} has been successfully emailed to ${toEmail}!`
      };
    } else {
      const errorText = await response.text();
      throw new Error(`EmailJS Error (${response.status}): ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to send real email via EmailJS:", error);
    return {
      success: false,
      error: error.message,
      message: `Failed to send email: ${error.message}`
    };
  }
};
