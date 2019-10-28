'use strict';

import { arrayToObj } from '../utils';


export const   setDBLoading = state => { state.databases.loading = true  };
export const unsetDBLoading = state => { state.databases.loading = false };

export const   setDBLoaded = state => { state.databases.loaded  = true  };
export const unsetDBLoaded = state => { state.databases.loaded  = false  };

export const setDatabases = (state, dbs) => {
	state.databases.all  = dbs;
	state.databases.byID = arrayToObj(dbs, 'name');
};

export const setCurrentDatabase = (state, dbName) => {
	state.databases.current = state.databases.byID[dbName] || null;
};
