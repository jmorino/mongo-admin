'use strict';

import { handleObject } from '../../middlewares/responses';

import listDatabases  from '../use-cases/list-databases';
import databaseInfos  from '../use-cases/get-database-overview';
import removeDatabase from '../use-cases/remove-database';


export const getAll = handleObject(async req => {
	const { databases } = await listDatabases();
	return databases;
});

//=================================================================================================================

export const get = handleObject(async ({ params }) => {
	return await databaseInfos(params.db);
});

//=================================================================================================================

export const create = handleObject(async req => {
	return { todo: true }; // nothing to do ?
});

//=================================================================================================================

export const remove = handleObject(async ({ params }) => {
	return await removeDatabase(params.db);
});
