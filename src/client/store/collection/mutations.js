'use strict';


export const   setLoading = state => { state.loading = true  };
export const unsetLoading = state => { state.loading = false };
export const   setLoaded  = state => { state.loaded  = true  };
export const unsetLoaded  = state => { state.loaded  = false };

export const setLoadError = (state, err = null) => { state.loadError = err };

//=================================================================================================================

export const setDBName = (state, dbName = null) => { state.db = dbName };
export const setName   = (state, name = null)   => { state.name = name };

//=================================================================================================================

export const setCollectionData = (state, { stats = {}, indexes = [], fields, rootFields }) => {
	state.stats = stats;
	state.indexes = indexes;
	state.fields = fields;
	state.rootFields = rootFields;
};
