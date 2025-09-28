import express from 'express';

import { getAds, getAdById, createAd, updateAd, deleteAd } from '../controllers/adController.js';

const router = express.Router();

router.get('/', getAds);
router.get('/:id', getAdById);
router.post('/', createAd);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;
