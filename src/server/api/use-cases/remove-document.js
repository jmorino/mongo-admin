'use strict';

import { ensureCollection, ObjectID } from '../../db';


export default async (dbName, collectionName, _id) => {
	const collection = await ensureCollection(dbName, collectionName);
	await collection.deleteOne({ _id: { $in: [_id, ObjectID(_id)] } });
};
