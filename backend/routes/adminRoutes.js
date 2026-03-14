import { Router } from 'express';
import { body } from 'express-validator';
import { addScholarship, loginAdmin, updateDeadline, updateScholarship } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 8 })], validateRequest, loginAdmin);

router.post(
  '/scholarships',
  authenticateAdmin,
  [
    body('name').notEmpty(),
    body('country').notEmpty(),
    body('fields').isArray({ min: 1 }),
    body('fundingCoverage').notEmpty(),
    body('ieltsRequirement').isIn(['Yes', 'No', 'Optional']),
    body('deadline').isISO8601(),
    body('officialLink').isURL()
  ],
  validateRequest,
  addScholarship
);

router.put('/scholarships/:id', authenticateAdmin, updateScholarship);
router.patch('/scholarships/:id/deadline', authenticateAdmin, [body('deadline').isISO8601()], validateRequest, updateDeadline);

export default router;
