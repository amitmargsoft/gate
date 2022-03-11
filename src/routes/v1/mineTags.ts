import { Router } from 'express';

import { add, list, show, edit, destroy } from 'controllers/mineTags';

const router = Router();

router.post('/get-tid', add);

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', edit);

router.delete('/:id([0-9]+)', destroy);

export default router;
