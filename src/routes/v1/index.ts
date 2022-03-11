import { Router } from 'express';

import mineTags from './mineTags';
import anprs from './anprs';
import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/anpr', anprs);
router.use('/tags', mineTags);

export default router;
