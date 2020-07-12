'use strict';

import API from '../../services/API';


export const loadDatabase = async ({ commit }, { dbName }) => {
	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.getDatabaseByID(dbName);
		commit('setName', dbName);
		commit('setDatabaseData', data);
		commit('setLoaded');
		commit('setLoadError', null);
	}
	catch(err) {
		console.error(err);
		commit('setLoadError', err.message || err.name);
		commit('unsetLoaded');
	}
	commit('unsetLoading');
};
