'use strict';

import { Router } from 'express';
import * as databases   from './middlewares/databases';
import * as collections from './middlewares/collections';
import * as documents   from './middlewares/documents';


export const router = Router();


router.get('/', (req, res, next) => {
	res.json({ ok: true });
});

// database-related routes
router.route('/databases')
	.get(databases.getAll);
router.route('/databases/:db')
	.get(databases.get)
	.post(databases.create)
	.delete(databases.remove);

// collection-related routes
router.route('/databases/:db/collections')
	.get(collections.getAll);
router.route('/databases/:db/collections/:collection')
	.get(collections.get)
	.post(collections.create)
	.delete(collections.remove);

// document-related routes
router.route('/databases/:db/collections/:collection/documents')
	.get(documents.getAll)
	.post(documents.create);
router.route('/databases/:db/collections/:collection/documents/:id')
	.get(documents.get)
	.post(documents.update)
	.delete(documents.remove);
