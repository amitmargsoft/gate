import { Router } from 'express';

import anprs from './anprs';
import auth from './auth';
import mineTags from './tags';
import store from './store';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/anpr', anprs);
router.use('/store', store);
router.use('/tags', mineTags);

export default router;
