'use strict';

import { ensureCollection } from '../../db';
import { validate } from '../../utils/validation';


const extractQueryParameters = ({ key, value, type, query, projection }) => {
	let selector  = {};
	let projector = {};

	if (key || value || type) {
		const validData = validateSimpleQuery({ key, value, type });
		selector = { [validData.key]: validData.value };
	}
	else if (query || projection) {
		const validData = validateComplexQuery({ query, projection });
		selector = validData.query;
		projector = validData.projection;
	}

	return { selector, projector };
};

const validateSimpleQuery = ({ key, value, type }) => {
	validate({ type }, {
		'type': { type: String, allowedValues: ['String','RegEx','Boolean','Number','Date'] }
	});
	return validate({ key, value }, {
		'key': String,
		'value': {
			'String': String,
			'RegEx': String,
			'Boolean': Boolean,
			'Number': Number,
			'Date': Date,
		}[type],
	});
};

const validateComplexQuery = ({ query, projection }) => {
	return validate({ query, projection }, {
		'query': { type: Object, blackbox: true },
		'projection': { type: Object, blackbox: true },
	});
};


export default async (dbName, collectionName, { p, c }, query) => {
	const collection = await ensureCollection(dbName, collectionName);
	
	const { selector, projector } = extractQueryParameters(query);
	const start = p * c;
	const cursor = collection.find(selector).project(projector).limit(c).skip(start);

	// fetch results and overall total
	const [total, items] = await Promise.all([cursor.count(), cursor.toArray()]);
	const end = start + items.length;
	
	return { start, end, total, items, page: p, count: c };
};
