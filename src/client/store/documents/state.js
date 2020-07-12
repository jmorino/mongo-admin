'use strict';

export const state = {
	loading: false,
	loaded: false,
	loadError: null,
	
	db: null,
	collection: null,

	query: {
		type: 'simple',
		content: null,
	},
	queryDraft: {
		queryType: 'simple',
		key: 'standard',
		value: 'SP',
		type: 'String',
		types: ['String','RegEx','Boolean','Number','Date'],			
		selector: '',
	},
	pagination: {
		page: 0,
		count: 20,
		total: 0,
	},
	items: [],
};
