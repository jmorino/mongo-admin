'use strict';

import { handleObject } from '../../middlewares/responses';

import listCollections  from '../use-cases/list-collections';
import collectionInfos  from '../use-cases/get-collection-overview';
import createCollection from '../use-cases/create-collection';
import removeCollection from '../use-cases/remove-collection';


export const getAll = handleObject(async ({ params }) => {
	return await listCollections(params.db);
});

//=================================================================================================================

export const get = handleObject(async ({ params }) => {
	return await collectionInfos(params.db, params.collection);
});

//=================================================================================================================

export const create = handleObject(async ({ params }) => {
	return await createCollection(params.db, params.collection);
});

//=================================================================================================================

export const remove = handleObject(async ({ params }) => {
	return await removeCollection(params.db, params.collection);
});
