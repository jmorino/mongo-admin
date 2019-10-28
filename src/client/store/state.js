'use strict';

import { arrayToObj } from '../utils';
import * as mock from './mock-data';


export default {
	databases: {
		loading: false,
		loaded: true,
		loadError: null,

		all: mock.databases,
		byID: arrayToObj(mock.databases, 'name'),
		current: mock.database,
	},

	collections: {
		loading: false,
		loaded: true,
		loadError: null,

		all: mock.collections,
		byID: arrayToObj(mock.collections, 'name'),
		current: mock.collection,
	},
	
	documents: {
		loading: false,
		loaded: true,
		loadError: null,

		all: mock.documents,
		byID: arrayToObj(mock.documents, '_id'),
		current: mock.documents[0],
		pagination: {
			page: 0,
			count: 10,
			total: null,
		},
	},
};