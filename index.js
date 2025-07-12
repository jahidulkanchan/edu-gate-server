const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow frontend requests from these domains
const allowedOrigins = ['http://localhost:3000', 'https://edugate-client.vercel.app'];

// ✅ Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies, auth headers, etc.
  }),
);

// ✅ Parse JSON body from requests
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api/users', require('./user/user.route'));
app.use('/api/colleges', require('./college/college.route'));
app.use('/api/admissions', require('./admission/admission.route'));
app.use('/api/reviews', require('./review/review.route'));

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('🎉 College Booking Server is Running...');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
