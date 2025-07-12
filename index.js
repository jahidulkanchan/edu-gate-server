const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://edugate-client.vercel.app', 
];
// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and headers
  }),
);
app.use(express.json());

// DB connect
connectDB();

// Modular Routes
const userRoutes = require('./user/user.route');
app.use('/api/users', userRoutes);

// app.use('/api/colleges', require('./college/college.route'));
// app.use('/api/admissions', require('./admission/admission.route'));
// app.use('/api/reviews', require('./review/review.route'));

app.get('/', (req, res) => {
  res.send('🎉 College Booking Server is Running...');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
