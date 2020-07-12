'use strict';


export const   setLoading = state => { state.loading = true  };
export const unsetLoading = state => { state.loading = false };
export const   setLoaded  = state => { state.loaded  = true  };
export const unsetLoaded  = state => { state.loaded  = false };

export const setLoadError = (state, err = null) => { state.loadError = err };

//=================================================================================================================

export const         setDB = (state,         dbName = null) => { state.db = dbName };
export const setCollection = (state, collectionName = null) => { state.collection = collectionName };

//=================================================================================================================

export const setPagination = (state, { page = null, count = null, total = null }) => {
	if (page  !== null) { state.pagination.page  = page  }
	if (count !== null) { state.pagination.count = count }
	if (total !== null) { state.pagination.total = total }
};

//=================================================================================================================

export const setDocuments = (state, documents) => {
	state.items = documents;
};

//=================================================================================================================

export const setQuery = (state, query) => {
	state.query = query || { type: 'simple', content: null };
};

export const setDraftQueryProperty = (state, { key, value }) => { state.queryDraft[key] = value };
