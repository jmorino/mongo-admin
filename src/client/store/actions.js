'use strict';

import API from '../services/API';


const api = new API();

export const loadDatabases = async ({ commit, state }) => {
	if (state.databases.loaded) { return }

	commit('setDBLoading');

	try {
		const dbs = await api.getAllDatabases();
		commit('setDBLoaded');
		commit('setDatabases', dbs);
		commit('unsetDBLoading');
	}
	catch(err) {
		// TODO: handle error
		commit('unsetDBLoading');
	}
};


export const loadDatabase = async ({ commit }, dbName) => {
	commit('setCurrentDatabase', dbName);
};