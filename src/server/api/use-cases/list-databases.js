'use strict';

import { db } from '../../db';


export default async () => {
	return await db().admin().listDatabases();
};
