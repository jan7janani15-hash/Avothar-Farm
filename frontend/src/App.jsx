import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import StayDetails from './StayDetails'
import Booking from './Booking'
import BookingReceipt from './BookingReceipt'
import Admin from './Admin'
import AdminLogin from './AdminLogin'

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('adminToken')
  return token ? children : <Navigate to="/admin-login" replace />
}

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stay-details" element={<StayDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-receipt" element={<BookingReceipt />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default MainApp
