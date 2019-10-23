'use strict';

import { handleObject, handlePaginatedObject } from '../../middlewares/responses';
import { validate, SimpleSchema } from '../../utils/validation';

import getDocuments    from '../use-cases/get-documents';
import getDocument     from '../use-cases/get-document';
import createDocument  from '../use-cases/create-document';
import replaceDocument from '../use-cases/replace-document';
import removeDocument  from '../use-cases/remove-document';


export const getAll = handlePaginatedObject(async ({ params, query }) => {
	const paging = validate(query, {
		'p': { type: SimpleSchema.Integer, optional: true, defaultValue:  0 },
		'c': { type: SimpleSchema.Integer, optional: true, defaultValue: 10 },
	});

	return await getDocuments(params.db, params.collection, paging);
});

//=================================================================================================================

export const get = handleObject(async ({ params }) => {
	return await getDocument(params.db, params.collection, params.id);
});

//=================================================================================================================

export const create = handleObject(async ({ params, body }) => {
	return await createDocument(params.db, params.collection, body);
});

//=================================================================================================================

export const update = handleObject(async ({ params, body }) => {
	return await replaceDocument(params.db, params.collection, params.id, body);
});

//=================================================================================================================

export const remove = handleObject(async ({ params }) => {
	return await removeDocument(params.db, params.collection, params.id);
});
