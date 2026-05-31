import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/authController';
import { registerUserSchema } from '../validations/authValidation';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema),
registerUser);

export default router;