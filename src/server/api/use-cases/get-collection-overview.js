'use strict';

import { ensureCollection } from '../../db';


export default async (dbName, collectionName) => {
	const collection = await ensureCollection(dbName, collectionName);
	const stats = await collection.stats();

	return { database: dbName, name: collectionName, stats };
};
