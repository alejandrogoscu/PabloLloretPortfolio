import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Fiction from './models/Fiction.js';

dotenv.config();

const fictions = [
  {
    title: 'El desentierro',
    type: 'Largometraje',
    role: 'Auxiliar de montaje - Grafismos',
    img: '/images/ficcion/001desentierro.webp',
    width: 'double',
    link: 'https://youtu.be/wZGkKVFmmj8',
    order: 1,
  },
  {
    title: 'Desconocidas',
    type: 'Serie de ficción',
    role: 'Montaje / Grafismos',
    img: '/images/ficcion/002desconocidas.webp',
    width: 'double',
    link: 'https://www.youtube.com/watch?v=KNnO6IHsWUo',
    order: 2,
  },
  {
    title: 'Dalí-Freud',
    type: 'Video conceptual',
    role: 'Montaje / VFX / Grafismos',
    img: '/images/ficcion/003dalifreud.webp',
    width: 'single',
    link: 'https://www.belvedere.at/dali-freud',
    order: 3,
  },
  {
    title: 'Sola no',
    type: 'Cortometraje',
    role: 'Ayudante de montaje',
    img: '/images/ficcion/004solano.webp',
    width: 'single',
    link: 'https://vimeo.com/776269926?fl=pl&fe=sh',
    order: 4,
  },
  {
    title: 'En record de Lupi',
    type: 'Cortometraje',
    role: 'Montaje',
    img: '/images/ficcion/005recordlupi.webp',
    width: 'single',
    link: 'https://vimeo.com/896161301?fl=pl&fe=sh',
    order: 5,
  },
  {
    title: 'L’Alqueria Blanca',
    type: 'Serie',
    role: 'Coordinador de montaje / Montaje',
    img: '/images/ficcion/006alqueriablanca.webp',
    width: 'double',
    link: 'https://youtu.be/GHFURJWlqto',
    order: 6,
  },
  {
    title: '900 días sin Anabel',
    type: 'Serie documental',
    role: 'Ayudante de montaje',
    img: '/images/ficcion/007diasisabel.webp',
    width: 'full',
    link: 'https://youtu.be/h4096r2JwTE',
    order: 7,
  },
  {
    title: 'La Coleccionista',
    type: 'Cortometraje',
    role: 'Ayudante de montaje',
    img: '/images/ficcion/008coleccionista.webp',
    width: 'single',
    link: 'https://youtu.be/gbZnw4fcr8A',
    order: 8,
  },
  {
    title: 'El retorno de Júpiter',
    type: 'Largometraje',
    role: 'Ayudante de montaje',
    img: '/images/ficcion/009jupiter.webp',
    width: 'double',
    link: null,
    order: 9,
  },
];

async function seedFictions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Fiction.deleteMany();
    await Fiction.insertMany(fictions);
    console.log('Fictions seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedFictions();
