'use strict';

import { ensureCollection } from '../../db';


export default async (dbName, collectionName, data) => {
	const collection = await ensureCollection(dbName, collectionName);
	const { insertedId } = await collection.insertOne(data);
	return { _id: insertedId, ...data };
};
