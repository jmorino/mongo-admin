'use strict';

import { ensureCollection, ObjectID } from '../../db';
import { NotFoundError } from '../../utils/errors';


export default async (dbName, collectionName, _id) => {
	const collection = await ensureCollection(dbName, collectionName);

	const document = await collection.findOne({ _id: { $in: [_id, ObjectID(_id)] } });
	if (!document) { throw new NotFoundError() }

	return document;
};
