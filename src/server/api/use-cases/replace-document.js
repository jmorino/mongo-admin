'use strict';

import { ensureCollection } from '../../db';
import getDocument from './get-document';


export default async (dbName, collectionName, _id, data) => {
	const document = await getDocument(dbName, collectionName, _id);
	
	// remove _id from data to prevent mutating it (_id is immutable)
	delete data._id;
	
	const collection = await ensureCollection(dbName, collectionName);
	await collection.replaceOne({ _id: document._id }, data);

	return { _id: document._id, ...data };
};
