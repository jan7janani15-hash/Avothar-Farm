import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function Admin() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBookings() {
      const token = sessionStorage.getItem('adminToken')

      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 401) {
          sessionStorage.removeItem('adminToken')
          navigate('/admin-login')
          return
        }

        if (!response.ok) {
          throw new Error('Unable to load bookings')
        }

        const data = await response.json()
        setBookings(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [navigate])

  const totalGuests = bookings.reduce((sum, booking) => sum + booking.guests, 0)
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total, 0)

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  function handleLogout() {
    sessionStorage.removeItem('adminToken')
    navigate('/admin-login')
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <span>AVOTHAR FARMS & STAYS</span>
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor your guest bookings.</p>
        </div>

        <div>
          <a href="/" className="admin-home-btn">Back to Website</a>
          <button onClick={handleLogout} className="admin-home-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="container admin-container">
        <div className="row g-4 admin-stats">
          <div className="col-md-4">
            <div className="stat-card">
              <span>Total Bookings</span>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <span>Total Guests</span>
              <h2>{totalGuests}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <span>Total Revenue</span>
              <h2>₹{totalRevenue.toLocaleString('en-IN')}</h2>
            </div>
          </div>
        </div>

        <div className="admin-bookings">
          <div className="admin-table-heading">
            <h2>Customer Bookings</h2>
            <span>{bookings.length} Bookings</span>
          </div>

          {loading && <p className="admin-message">Loading bookings...</p>}
          {error && <p className="admin-error">{error}</p>}

          {!loading && !error && bookings.length === 0 && (
            <p className="admin-message">No bookings found.</p>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div className="table-responsive">
              <table className="table admin-table">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Guests</th>
                    <th>Nights</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phone}</td>
                      <td>{formatDate(booking.checkIn)}</td>
                      <td>{formatDate(booking.checkOut)}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.nights}</td>
                      <td>₹{booking.total.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
