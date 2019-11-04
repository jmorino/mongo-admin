'use strict';

import { ensureCollection, ObjectID } from '../../db';
import { NotFoundError } from '../../utils/errors';


export default async (dbName, collectionName, _id) => {
	const collection = await ensureCollection(dbName, collectionName);

	const ids = [_id];
	try { ids.push(ObjectID(_id)) }
	catch(err) {}

	const document = await collection.findOne({ _id: { $in: ids } });
	if (!document) { throw new NotFoundError() }

	return document;
};
