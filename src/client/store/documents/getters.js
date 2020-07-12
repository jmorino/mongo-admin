'use strict';

export const loading = state => state.loading;
export const error = state => state.loadError;

export const db = state => state.db;
export const collection = state => state.collection;

export const documents = state => state.items || [];

export const page  = state => state.pagination.page;
export const count = state => state.pagination.count;
export const total = state => state.pagination.total;

export const queryIsActive = state => !!state.query.content;
export const queryType = state => state.query.type;
export const queryContent = state => state.query.content;
export const queryDraft = state => state.queryDraft;
export const queryErrors = (state, getters) => {
	const errors = {};
	const { queryType, key, value, type, selector } = getters.queryDraft;

	if (queryType === 'simple') {
		// validate simple query
		if (!key)   { errors['key']   = 'Missing' }
		if (!value) { errors['value'] = 'Missing' }
		if (!type)  { errors['type']  = 'Missing' }
	}
	else if (queryType === 'complex') {
		// validate complex query
		try {
			const q = eval(selector);
			if (typeof q !== 'object' || q === null) { errors['selector'] = 'Invalid value' }
		}
		catch(err) {
			errors['selector'] = 'Invalid value';
		}
	}
	else {
		throw new Error(`Unsupported query type ${queryType}`);
	}

	return Object.keys(errors).length ? errors : null;
};

export const validatedQuery = (state, getters) => {
	if (getters.queryErrors) { return null }

	const { queryType, key, value, type, selector } = getters.queryDraft;

	// validate simple query
	if (queryType === 'simple') {
		return { type: queryType, content: { key, value, type } };
	}

	// validate complex query
	if (queryType === 'complex') {
		return { type: queryType, content: selector };
	}

	throw new Error(`Unsupported query type ${queryType}`);
};
