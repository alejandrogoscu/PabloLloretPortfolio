import express from 'express';
import { getAds, getAdById, createAd, updateAd, deleteAd } from '../controllers/adController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAds);
router.get('/:id', getAdById);
router.post('/', verifyAdmin, createAd);
router.put('/:id', verifyAdmin, updateAd);
router.delete('/:id', verifyAdmin, deleteAd);

export default router;
