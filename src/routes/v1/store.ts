import { Router } from 'express';

import { add, list } from 'controllers/store';

const router = Router();

router.get('/', list);
router.post('/add', add);
export default router;
