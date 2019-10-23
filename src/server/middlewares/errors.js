'use strict';

import { MongoError } from 'mongodb';
import { handleError } from './responses';
import { WSError } from '../utils/errors';


const catchWSErrors = handleError(err => {
	if (!(err instanceof WSError)) { return }
	return err;
});

//=================================================================================================================

const catchMongoDBErrors = handleError(err => {
	if (!(err instanceof MongoError)) { return }
	
	const response = { statusCode: 400, message: 'MongoDBError', details: err.message }
	if (err.code === 11000) { response.statusCode = 409 }

	return response;
});

//=================================================================================================================

const catchAllErrors = handleError(err => {
	console.error(err);
	return { statusCode: 500, message: err.message }
});


export const middlewares = [
	catchMongoDBErrors,
	catchWSErrors,
	catchAllErrors,
];
