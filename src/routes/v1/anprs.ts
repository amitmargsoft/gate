import { Router } from 'express';

import { add, list, show, edit, destroy } from 'controllers/anprs';
import { validatorAnpr } from 'middleware/validation/anpr';

const router = Router();

router.get('/', list);
router.post('/get-anpr-data', add);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', edit);

router.delete('/:id([0-9]+)', destroy);

export default router;
