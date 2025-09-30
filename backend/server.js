import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin.js';
import adRoutes from './routes/ads.js';
import fictionRoutes from './routes/fiction.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/fiction', fictionRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
