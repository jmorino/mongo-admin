'use strict';

import { ensureCollection, ObjectID } from '../../db';


const fieldSorter = (a,b) => {
	if (a === '_id') { return -1 }
	if (b === '_id') { return +1 }
	if (a < b) { return -1 }
	if (a > b) { return +1 }
	return 0;
};

const findAllKeys = (obj, parentKey = null) => {
	if (Array.isArray(obj)) {
		return findAllKeys(obj[0], parentKey);
	}
	if (typeof obj === 'object' && obj !== null && !(obj instanceof ObjectID)) {
		const keys = Object.keys(obj);
		const nestedKeys = keys.map(key => findAllKeys(obj[key], key));
		
		const prefix = parentKey ? `${parentKey}.` : '';
		return keys.concat(...nestedKeys).map(key => `${prefix}${key}`);
	}
	return [];
};


export default async (dbName, collectionName) => {
	const collection = await ensureCollection(dbName, collectionName);
	const stats = await collection.stats();
	const sample = stats.count > 0 ? await collection.findOne() : {};
	const fields = findAllKeys(sample).sort(fieldSorter);
	const rootFields = Object.keys(sample).sort(fieldSorter);

	return { database: dbName, name: collectionName, stats, rootFields, fields };
};
