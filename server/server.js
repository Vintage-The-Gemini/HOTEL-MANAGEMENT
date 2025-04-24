// server/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    // Don't exit the process so the server still runs even if DB connection fails
  });

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Use routes - uncomment these one by one as you implement them
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Only uncomment these once you've fixed the controller implementations
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// const hotelRoutes = require("./routes/hotelRoutes");
// app.use("/api/hotels", hotelRoutes);

// const inquiryRoutes = require("./routes/inquiryRoutes");
// app.use("/api/inquiries", inquiryRoutes);

// const quotationRoutes = require("./routes/quotationRoutes");
// app.use("/api/quotations", quotationRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});