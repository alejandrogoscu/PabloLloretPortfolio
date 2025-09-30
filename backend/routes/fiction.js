import express from 'express';
import {
  getFictions,
  getFictionById,
  createFiction,
  updateFiction,
  deleteFiction,
} from '../controllers/fictionController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFictions);
router.get('/:id', getFictionById);
router.post('/', verifyAdmin, createFiction);
router.put('/:id', verifyAdmin, updateFiction);
router.delete('/:id', verifyAdmin, deleteFiction);

export default router;
