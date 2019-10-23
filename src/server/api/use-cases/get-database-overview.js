'use strict';

import { db } from '../../db';


export default async dbName => {
	const stats = await db(dbName).stats();
	return { name: dbName, stats };
};
