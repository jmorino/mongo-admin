'use strict';

import { db } from '../../db';


export default async dbName => {
	await db(dbName).dropDatabase();
};
