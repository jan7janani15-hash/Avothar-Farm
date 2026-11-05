import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Booking.css'

function Booking() {
  const location = useLocation()
  const navigate = useNavigate()

  const stays = {
    'nature-cottage': { name: 'Nature Cottage', price: 4500 },
    'luxury-farm-stay': { name: 'Luxury Farm Stay', price: 6500 },
    'wooden-cottage': { name: 'Wooden Cottage', price: 5500 }
  }

  const stayId = location.state?.stayId || 'nature-cottage'
  const selectedStay = stays[stayId] || stays['nature-cottage']
  const price = selectedStay.price

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 0

  async function handleBooking(e) {
    e.preventDefault()

    if (nights <= 0) {
      alert('Please select a valid check-out date.')
      return
    }

    setIsSubmitting(true)

    try {
      const bookingDetails = {
        name,
        email,
        phone,
        stayName: selectedStay.name,
        checkIn,
        checkOut,
        guests: Number(guests),
        nights,
        total: price * nights
      }

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed')
      }

      const savedBooking = data.booking || data

      navigate('/booking-receipt', {
        state: {
          booking: {
            ...bookingDetails,
            _id: savedBooking._id
          }
        }
      })

    } catch (error) {
      alert('Booking failed: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-heading">
        <span>AVOTHAR FARMS & STAYS</span>
        <h1>Reserve Your Escape</h1>
        <p>Complete your details and get ready for a peaceful getaway.</p>
      </div>

      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <form className="booking-form" onSubmit={handleBooking}>
              <h3>Guest Information</h3>
              <p>Please provide your contact details.</p>

              <label>Full Name</label>
              <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" required />

              <label>Email Address</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />

              <label>Phone Number</label>
              <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" required />

              <hr />

              <h3>Your Stay</h3>
              <div className="row">
                <div className="col-md-6">
                  <label>Check-in</label>
                  <input type="date" className="form-control" min={new Date().toISOString().split('T')[0]} value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
                </div>

                <div className="col-md-6">
                  <label>Check-out</label>
                  <input type="date" className="form-control" min={checkIn || new Date().toISOString().split('T')[0]} value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
                </div>
              </div>

              <label>Number of Guests</label>
              <select className="form-select" value={guests} onChange={e => setGuests(e.target.value)}>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>

              <button type="submit" className="booking-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Confirm Booking Request'}
              </button>

              <Link to="/stay-details" state={{ stayId }} className="back-link">Back to Stay Details</Link>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="booking-summary">
              <img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900" alt={selectedStay.name} />

              <div className="summary-content">
                <span className="summary-label">YOUR SELECTED STAY</span>
                <h3>{selectedStay.name}</h3>
                <p>Peaceful surroundings · Nature experience</p>

                <hr />

                <div className="summary-row">
                  <span>Price per night</span>
                  <strong>₹{price.toLocaleString('en-IN')}</strong>
                </div>

                <div className="summary-row">
                  <span>Number of nights</span>
                  <strong>{nights}</strong>
                </div>

                <div className="summary-row">
                  <span>Guests</span>
                  <strong>{guests}</strong>
                </div>

                <hr />

                <div className="summary-row total">
                  <span>Estimated Total</span>
                  <strong>₹{(price * nights).toLocaleString('en-IN')}</strong>
                </div>

                <small>Final booking confirmation is subject to availability.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
