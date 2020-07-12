'use strict';

export const state = {
	loading: false,
	loaded: false,
	loadError: null,
	
	db: null,
	collection: null,
	id: null,

	content: null,
	draft: {
		original: '',
		modified: '',
	},
};
