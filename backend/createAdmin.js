const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const Admin = require('./models/Admin')

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    if (!username || !password) {
      throw new Error('Admin credentials missing in .env file')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await Admin.findOneAndUpdate(
      { username },
      { username, password: hashedPassword },
      { upsert: true, new: true }
    )

    console.log('Admin Account Created Successfully!')
  } catch (error) {
    console.log('Error:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

createAdmin()
