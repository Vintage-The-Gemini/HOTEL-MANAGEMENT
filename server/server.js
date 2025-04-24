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

// Import routes - comment these out initially to test the server
// const authRoutes = require("./routes/authRoutes");
// const hotelRoutes = require("./routes/hotelRoutes");
// const userRoutes = require("./routes/userRoutes");
// const resourceRoutes = require("./routes/resourceRoutes");
// const clientRoutes = require("./routes/clientRoutes");
// const inquiryRoutes = require("./routes/inquiryRoutes");
// const quotationRoutes = require("./routes/quotationRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const invoiceRoutes = require("./routes/invoiceRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const agentRoutes = require("./routes/agentRoutes");
// const reportRoutes = require("./routes/reportRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Use routes - comment these out initially
// app.use("/api/auth", authRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/clients", clientRoutes);
// app.use("/api/inquiries", inquiryRoutes);
// app.use("/api/quotations", quotationRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/invoices", invoiceRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/agents", agentRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/notifications", notificationRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});