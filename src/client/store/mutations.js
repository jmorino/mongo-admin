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
export const   setCollectionError   = (state, error) => { state.collection.loadError = error.message };
export const unsetCollectionError   = state => { state.collection.loadError = null };

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

export const setDraftQueryProperty = (state, { key, value }) => { state.documents.draftQuery[key] = value };
export const submitQuery = state => {
	const { queryType, key, value, type, query, projection } = state.documents.draftQuery;
	state.documents.currentQuery = {
		type: queryType,
		content: queryType === 'simple' ? { key, value, type } : { query, projection },
	};
};
export const clearQuery = state => {
	state.documents.currentQuery = { type: 'simple', content: null };
	state.documents.draftQuery = { ...state.documents.draftQuery,
		key: null,
		value: null,
		type: state.documents.draftQuery.types[0],
		query: null,
		projection: null,
	};
};

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


export const   setDocumentLoading = state => { state.document.loading = true  };
export const unsetDocumentLoading = state => { state.document.loading = false };
export const   setDocumentLoaded  = state => { state.document.loaded  = true  };
export const unsetDocumentLoaded  = state => { state.document.loaded  = false  };


export const setCurrentDocument = (state, document) => {
	state.document.current = document;
};

export const setDocument = (state, document) => {
	if (!document) {
		state.document.original = state.document.current = '';
	}
	else {
		state.document.original = state.document.current = JSON.stringify(document, null, 2);
	}
};

export const revertDocument = state => {
	state.document.current = state.document.original;
};