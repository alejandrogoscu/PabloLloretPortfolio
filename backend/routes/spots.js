import express from 'express';
import { getSpots, getSpotById, createSpot, updateSpot, deleteSpot } from '../controllers/spotsController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSpots);
router.get('/:id', getSpotById);
router.post('/', verifyAdmin, createSpot);
router.put('/:id', verifyAdmin, updateSpot);
router.delete('/:id', verifyAdmin, deleteSpot);

export default router;
