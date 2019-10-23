'use strict';

import { Router } from 'express';


export const router = Router();

router.get('/', (req, res, next) => {
	res.json({ ok: true });
});
