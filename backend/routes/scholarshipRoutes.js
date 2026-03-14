import { Router } from 'express';
import { body, query } from 'express-validator';
import {
  getComparison,
  getScholarships,
  matchScholarships,
  saveProfile,
  subscribeAlerts,
  toggleFavorite
} from '../controllers/scholarshipController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.get(
  '/',
  [query('deadlineBefore').optional().isISO8601().withMessage('deadlineBefore must be ISO date')],
  validateRequest,
  getScholarships
);

router.post(
  '/match',
  [
    body('fullName').notEmpty(),
    body('email').isEmail(),
    body('citizenshipCountry').notEmpty(),
    body('qualification').notEmpty(),
    body('fieldOfInterest').notEmpty(),
    body('preferredStudyCountry').notEmpty(),
    body('englishTestStatus').isIn(['IELTS', 'No IELTS', 'MOI']),
    body('budget').equals('Fully funded only'),
    body('gpaOrPercentage').isFloat({ min: 0, max: 100 })
  ],
  validateRequest,
  matchScholarships
);

router.post('/profile', [body('email').isEmail()], validateRequest, saveProfile);
router.post('/favorites', [body('email').isEmail(), body('scholarshipId').isMongoId()], validateRequest, toggleFavorite);
router.post('/alerts', [body('email').isEmail(), body('enabled').isBoolean()], validateRequest, subscribeAlerts);
router.get('/compare', getComparison);

export default router;
