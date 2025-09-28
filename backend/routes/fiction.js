import express from 'express';

import {
  getFictions,
  getFictionById,
  createFiction,
  updateFiction,
  deleteFiction,
} from '../controllers/fictionController.js';

const router = express.Router();

router.get('/', getFictions);
router.get('/:id', getFictionById);
router.post('/', createFiction);
router.put('/:id', updateFiction);
router.delete('/:id', deleteFiction);

export default router;
