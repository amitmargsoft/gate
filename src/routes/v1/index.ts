import { Router } from 'express';

import anprs from './anprs';
import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/anprs', anprs);

export default router;
