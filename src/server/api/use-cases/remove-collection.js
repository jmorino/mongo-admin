'use strict';

import { ensureCollection } from '../../db';
import { NotFoundError } from '../../utils/errors';


export default async (dbName, collectionName) => {
	try {
		const collection = await ensureCollection(dbName, collectionName);
		await collection.drop();
	}
	catch(err) {
		if (err instanceof NotFoundError) { return }
		throw err;
	}
};
