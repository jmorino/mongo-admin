'use strict';


export const   setLoading = state => { state.loading = true  };
export const unsetLoading = state => { state.loading = false };
export const   setLoaded  = state => { state.loaded  = true  };
export const unsetLoaded  = state => { state.loaded  = false };

export const setLoadError = (state, err = null) => { state.loadError = err };

//=================================================================================================================

export const setDBName = (state, dbName) => { state.db = dbName };

//=================================================================================================================

export const setItems = (state, collections) => {
	collections.sort((a,b) => {
		if (a.name < b.name) { return -1 }
		if (a.name > b.name) { return +1 }
		return 0;
	});

	state.items = collections;
};
