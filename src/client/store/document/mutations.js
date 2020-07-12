'use strict';


export const   setLoading = state => { state.loading = true  };
export const unsetLoading = state => { state.loading = false };
export const   setLoaded  = state => { state.loaded  = true  };
export const unsetLoaded  = state => { state.loaded  = false };

export const setLoadError = (state, err = null) => { state.loadError = err };

//=================================================================================================================

export const         setDB = (state,         dbName = null) => { state.db = dbName };
export const setCollection = (state, collectionName = null) => { state.collection = collectionName };
export const         setID = (state,             id = null) => { state.id = id === '$new' ? null : id };

//=================================================================================================================

export const setDocument = (state, document) => {
	state.content = document;
	state.draft.original = state.draft.modified = JSON.stringify(document, null, 2);
};

//=================================================================================================================

export const editDocument = (state, content) => {
	state.draft.modified = content;
};

//=================================================================================================================

export const revertDocument = state => {
	state.draft.modified = state.draft.original;
};
