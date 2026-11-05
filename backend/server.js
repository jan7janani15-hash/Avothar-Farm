const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Booking = require('./models/Booking')
const Admin = require('./models/Admin')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Avothar Farms & Stays Backend is Running!')
})

// Admin Authentication Middleware
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access denied. Please login.'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token. Please login again.'
    })
  }
}

// Save Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body)
    await booking.save()

    res.status(201).json({
      message: 'Booking Saved Successfully!',
      booking
    })
  } catch (error) {
    res.status(400).json({
      message: 'Booking Failed',
      error: error.message
    })
  }
})

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid username or password'
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid username or password'
      })
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      message: 'Login Successful!',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Login Failed'
    })
  }
})

// Get Bookings - Admin Only
app.get('/api/bookings', verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ _id: -1 })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch bookings'
    })
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!')

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB Connection Failed:', error.message)
  })
