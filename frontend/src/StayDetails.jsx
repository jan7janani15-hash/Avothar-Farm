import { useLocation, useNavigate } from 'react-router-dom'
import './StayDetails.css'

function StayDetails() {
  const navigate = useNavigate()
  const location = useLocation()

  const stays = {
    'nature-cottage': {
      name: 'Nature Cottage',
      price: 4500,
      description: 'Experience tranquillity, comfort and the beauty of nature.',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200'
    },
    'luxury-farm-stay': {
      name: 'Luxury Farm Stay',
      price: 6500,
      description: 'Experience luxury and comfort in a peaceful farm environment.',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200'
    },
    'wooden-cottage': {
      name: 'Wooden Cottage',
      price: 5500,
      description: 'Enjoy a cozy wooden cottage surrounded by natural beauty.',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200'
    }
  }

  const stay = stays[location.state?.stayId] || stays['nature-cottage']

  const amenities = [
    'Complimentary Wi-Fi',
    'Premium Bedding',
    'Private Parking',
    'Private Garden',
    'Dining Facilities',
    'Room Service'
  ]

  return (
    <div className="stay-details-page">
      <nav className="stay-nav">
        <h3>AVOTHAR <span>FARMS & STAYS</span></h3>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </nav>

      <div className="container py-5">
        <div className="stay-title">
          <span>OUR COLLECTION OF STAYS</span>
          <h1>{stay.name}</h1>
          <p>{stay.description}</p>
        </div>

        <div className="stay-gallery">
          <img src={stay.image} alt={stay.name} />
          <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700" alt="Stay interior" />
          <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700" alt="Stay exterior" />
        </div>

        <div className="row g-5 mt-3">
          <div className="col-lg-8">
            <section className="stay-section">
              <span className="section-label">WELCOME TO YOUR STAY</span>
              <h2>A peaceful retreat surrounded by greenery</h2>
              <p>
                Discover a refreshing escape where natural beauty meets
                comfortable living. Enjoy a relaxing atmosphere, thoughtfully
                designed accommodation and a peaceful setting for quality
                time with family and friends.
              </p>
            </section>

            <hr />

            <section className="stay-section">
              <span className="section-label">COMFORT & CONVENIENCE</span>
              <h2>Stay Amenities</h2>

              <div className="amenities-grid">
                {amenities.map(name => (
                  <div className="amenity-item" key={name}>
                    <span>✓</span>
                    {name}
                  </div>
                ))}
              </div>
            </section>

            <hr />

            <section className="stay-section">
              <span className="section-label">YOUR STAY EXPERIENCE</span>
              <h2>Important Information</h2>
              <div className="stay-info">
                <p><strong>Check-in</strong><span>From 12:00 PM</span></p>
                <p><strong>Check-out</strong><span>Until 11:00 AM</span></p>
                <p><strong>Property Type</strong><span>{stay.name}</span></p>
                <p><strong>Ideal For</strong><span>Families & Friends</span></p>
              </div>
            </section>
          </div>

          <div className="col-lg-4">
            <div className="stay-price-card">
              <span className="section-label">EXPERIENCE YOUR STAY</span>
              <h2>₹{stay.price.toLocaleString('en-IN')} <small>/ night</small></h2>
              <p>Enjoy a comfortable stay in a peaceful natural setting.</p>
              <hr />
              <div className="price-detail">
                <span>Accommodation</span>
                <strong>{stay.name}</strong>
              </div>
              <div className="price-detail">
                <span>Booking Type</span>
                <strong>Per Night</strong>
              </div>
              <button onClick={() => navigate('/booking', { state: { stayId: location.state?.stayId || 'nature-cottage' } })}>
                Reserve Your Stay
              </button>
              <small className="price-note">
                Final confirmation is subject to availability.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StayDetails
