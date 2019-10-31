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
	state.collections.all = collections;
	state.collections.byID = arrayToObj(collections, 'name');
};
