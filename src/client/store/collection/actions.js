'use strict';

import API from '../../services/API';


export const loadCollection = async ({ commit }, { dbName, collectionName }) => {
	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.getCollectionByID(dbName, collectionName);
		commit('setDBName', dbName);
		commit('setName', collectionName);
		commit('setCollectionData', data);
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
