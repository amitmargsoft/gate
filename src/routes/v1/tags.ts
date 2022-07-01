import { Router } from 'express';

 import { add, list } from 'controllers/tags';

const router = Router();

router.post('/add', add);

router.get('/', list);


export default router;
