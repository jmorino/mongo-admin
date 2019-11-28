'use strict';

import { handleObject, handlePaginatedObject } from '../../middlewares/responses';
import { validate, SimpleSchema } from '../../utils/validation';

import getDocuments    from '../use-cases/get-documents';
import getDocument     from '../use-cases/get-document';
import createDocument  from '../use-cases/create-document';
import replaceDocument from '../use-cases/replace-document';
import removeDocument  from '../use-cases/remove-document';


export const query = handlePaginatedObject(async ({ params, query, body }) => {
	const paging = validate(query, {
		'p': { type: SimpleSchema.Integer, optional: true, defaultValue:  0 },
		'c': { type: SimpleSchema.Integer, optional: true, defaultValue: 10 },
	});
	const q = validate(body, {
		'query': { type: Object, blackbox: true },
		'projection': { type: Object, blackbox: true },
	});

	return await getDocuments(params.db, params.collection, paging, q);
});

//=================================================================================================================

export const getAll = handlePaginatedObject(async ({ params, query }) => {
	const paging = validate(query, {
		'p': { type: SimpleSchema.Integer, optional: true, defaultValue:  0 },
		'c': { type: SimpleSchema.Integer, optional: true, defaultValue: 10 },
	});
	const q = validate(query, {
		'key':   { type: String, optional: true, defaultValue: null },
		'value': { type: String, optional: true, defaultValue: null },
		'type':  { type: String, optional: true, defaultValue: null },
	});

	return await getDocuments(params.db, params.collection, paging, q);
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
