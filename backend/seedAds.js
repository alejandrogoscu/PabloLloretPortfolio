import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ad from './models/Ad.js';

dotenv.config();

const ads = [
  {
    title: 'FUNCEM',
    type: 'Spot publicitario',
    role: 'Montaje',
    img: '/images/ads/001funcem.webp',
    width: 'single',
    link: 'https://youtu.be/tybHfeG-K8M',
    order: 1,
  },
  {
    title: 'Catalogo CURTS ‘17',
    type: 'Spot publicitario',
    role: 'Montaje',
    img: '/images/ads/002curts2017.webp',
    width: 'single',
    link: 'https://vimeo.com/1064265832?fl=pl&fe=sh',
    order: 2,
  },
  {
    title: 'La ruta más corta 2017',
    type: 'Spot publicitario',
    role: 'Montaje',
    img: '/images/ads/003rutacorta2017.webp',
    width: 'single',
    link: 'https://vimeo.com/1064267518?fl=pl&fe=sh',
    order: 3,
  },
  {
    title: 'La ruta más corta 2018',
    type: 'Spot publicitario',
    role: 'Montaje',
    img: '/images/ads/004rutacorta2018.webp',
    width: 'full',
    link: 'https://vimeo.com/1064274156?fl=pl&fe=sh',
    order: 4,
  },
  {
    title: 'Sara Baras - Archivo',
    type: 'Spot publicitario',
    role: 'Montaje',
    img: '/images/ads/005sarabaras.webp',
    width: 'full',
    link: 'https://vimeo.com/1065523380?fl=pl&fe=sh',
    order: 5,
  },
];

async function seedAds() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Ad.deleteMany();
    await Ad.insertMany(ads);
    console.log('Ads seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAds();
