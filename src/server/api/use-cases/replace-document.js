'use strict';

import { ensureCollection } from '../../db';
import getDocument from './get-document';


export default async (dbName, collectionName, _id, data) => {
	const document = await getDocument(dbName, collectionName, _id);
	
	// force _id into new document
	const doc = { _id: document._id, ...data };
	
	const collection = await ensureCollection(dbName, collectionName);
	await collection.replaceOne({ _id: document._id }, doc);

	return doc;
};
