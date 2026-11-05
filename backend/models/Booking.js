
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  nights: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
