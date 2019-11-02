'use strict';

import { arrayToObj } from '../utils';


export const   setDBsLoading = state => { state.databases.loading = true  };
export const unsetDBsLoading = state => { state.databases.loading = false };
export const   setDBsLoaded  = state => { state.databases.loaded  = true  };
export const unsetDBsLoaded  = state => { state.databases.loaded  = false  };

export const setDatabases = (state, dbs) => {
	state.databases.all  = dbs;
	state.databases.byID = arrayToObj(dbs, 'name');
};

//=================================================================================================================

export const   setDBLoading = state => { state.database.loading = true  };
export const unsetDBLoading = state => { state.database.loading = false };
export const   setDBLoaded  = state => { state.database.loaded  = true  };
export const unsetDBLoaded  = state => { state.database.loaded  = false  };

export const setDatabase = (state, db) => {
	if (!db) {
		state.database.current = null;
	}
	else {
		state.database.current = db;
		state.database.byID[db.name] = db; // cache result (useful?)
	}
};

//=================================================================================================================

export const   setCollectionsLoading = state => { state.collections.loading = true  };
export const unsetCollectionsLoading = state => { state.collections.loading = false };
export const   setCollectionsLoaded  = state => { state.collections.loaded  = true  };
export const unsetCollectionsLoaded  = state => { state.collections.loaded  = false  };

export const setCollections = (state, collections) => {
	collections.sort((a,b) => {
		if (a.name < b.name) { return -1 }
		if (a.name > b.name) { return +1 }
		return 0;
	});

	state.collections.all = collections;
	state.collections.byID = arrayToObj(collections, 'name');
};

//=================================================================================================================

export const   setCollectionLoading = state => { state.collection.loading = true  };
export const unsetCollectionLoading = state => { state.collection.loading = false };
export const   setCollectionLoaded  = state => { state.collection.loaded  = true  };
export const unsetCollectionLoaded  = state => { state.collection.loaded  = false  };

export const setCollection = (state, collection) => {
	if (!collection) {
		state.collection.current = null;
	}
	else {
		state.collection.current = collection;
		state.collection.byID[collection.name] = collection; // cache result (useful?)
	}
};

//=================================================================================================================

export const setQuery = (state, query ) => { state.documents.query = query };
export const setPagination = (state, pagination) => { Object.assign(state.documents.pagination, pagination) };

export const setDocumentsPrevPage = (state) => { --state.documents.pagination.page };
export const setDocumentsNextPage = (state) => { ++state.documents.pagination.page };
export const setDocumentsPageByIndex = (state, index) => { 
	const page = parseInt(index / state.documents.pagination.count);
	state.documents.pagination.page = page;
};

export const   setDocumentsLoading = state => { state.documents.loading = true  };
export const unsetDocumentsLoading = state => { state.documents.loading = false };
export const   setDocumentsLoaded  = state => { state.documents.loaded  = true  };
export const unsetDocumentsLoaded  = state => { state.documents.loaded  = false  };

export const setDocuments = (state, documents) => {
	state.documents.all  = documents;
	state.documents.byID = arrayToObj(documents, '_id');
};
