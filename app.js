const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const mongoose = require("mongoose");
const moderationRoutes = require("./routes/moderationRoutes");

const portfolioRoute = require("./routes/PortfolioRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

dotenv.config();
const app = express();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Middleware
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/portfolio", portfolioRoute);
app.use("/api/inquiries", inquiryRoutes);
require('./swagger')(app)
app.use("/api/moderation", moderationRoutes);
app.get("/", (req, res) => {
  res.send("Pixisphere Backend")
})

module.exports = app;
