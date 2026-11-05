import { useLocation, Link } from 'react-router-dom'
import './BookingReceipt.css'

function BookingReceipt() {
  const location = useLocation()
  const booking = location.state?.booking

  if (!booking) {
    return (
      <div className="receipt-page">
        <h2>Receipt Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-success">✓</div>
        <h1>Booking Receipt</h1>
        <p className="receipt-subtitle">Your booking request has been received successfully.</p>

        <div className="receipt-brand">AVOTHAR FARMS & STAYS</div>
        <div className="receipt-divider"></div>

        <div className="receipt-row">
          <span>Booking ID</span>
          <strong>{booking._id || 'Not available'}</strong>
        </div>
        <div className="receipt-row">
          <span>Guest Name</span>
          <strong>{booking.name}</strong>
        </div>
        <div className="receipt-row">
          <span>Email</span>
          <strong>{booking.email}</strong>
        </div>
        <div className="receipt-row">
          <span>Phone</span>
          <strong>{booking.phone}</strong>
        </div>
        <div className="receipt-row">
          <span>Selected Stay</span>
          <strong>Nature Cottage</strong>
        </div>
        <div className="receipt-row">
          <span>Check-in</span>
          <strong>{booking.checkIn}</strong>
        </div>
        <div className="receipt-row">
          <span>Check-out</span>
          <strong>{booking.checkOut}</strong>
        </div>
        <div className="receipt-row">
          <span>Guests</span>
          <strong>{booking.guests}</strong>
        </div>
        <div className="receipt-row">
          <span>Number of Nights</span>
          <strong>{booking.nights}</strong>
        </div>

        <div className="receipt-total">
          <span>Total Amount</span>
          <strong>₹{Number(booking.total).toLocaleString('en-IN')}</strong>
        </div>

        <p className="receipt-note">
          Note: Final booking confirmation is subject to availability.
        </p>

        <button className="receipt-print" onClick={() => window.print()}>
          Print Receipt
        </button>

        <Link to="/" className="receipt-home">Back to Home</Link>
      </div>
    </div>
  )
}

export default BookingReceipt
