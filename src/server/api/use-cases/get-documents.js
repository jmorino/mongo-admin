'use strict';

import { ensureCollection } from '../../db';


export default async (dbName, collectionName, { p, c }) => {
	const collection = await ensureCollection(dbName, collectionName);
	
	const start = p * c;
	const cursor = collection.find({}).limit(c).skip(start);

	// fetch results and overall total
	const [total, items] = await Promise.all([cursor.count(), cursor.toArray()]);
	const end = start + items.length;
	
	return { start, end, total, items, page: p, count: c };
};
