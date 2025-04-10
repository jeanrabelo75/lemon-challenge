import express from 'express';
import { handleEligibility } from '../controllers/eligibility.controller.js';

const router = express.Router();

router.post('/eligibility', handleEligibility);

export default router;
