import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import Ad from './models/Ad.js';
import Fiction from './models/Fiction.js';

dotenv.config();

const adsPath = path.resolve('..', 'frontend', 'content', 'data', 'ads.json');
const fictionPath = path.resolve('..', 'frontend', 'content', 'data', 'ficcion.json');

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adsData = JSON.parse(fs.readFileSync(adsPath, 'utf-8')).filter((ad) => ad.title);
    await Ad.deleteMany();
    await Ad.insertMany(adsData);
    console.log('Ads imported successfully');

    const fictionData = JSON.parse(fs.readFileSync(fictionPath, 'utf-8')).filter((f) => f.title);
    await Fiction.deleteMany();
    await Fiction.insertMany(fictionData);
    console.log('Fiction projects imported successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

importData();
