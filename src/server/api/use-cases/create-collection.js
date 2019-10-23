'use strict';

import { db } from '../../db';


export default async (dbName, collectionName) => {
	await db(dbName).createCollection(collectionName);
};
