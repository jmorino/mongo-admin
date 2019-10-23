'use strict';

import { db } from '../../db';


export default async dbName => {
	return await db(dbName).listCollections().toArray();
};