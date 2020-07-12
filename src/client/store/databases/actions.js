'use strict';

import API from '../../services/API';


export const loadDatabases = async ({ commit }) => {
	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.getAllDatabases();
		commit('setDatabases', data);
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

//=================================================================================================================

export const createDB = async ({ commit }, { dbName }) => {
	// TODO
	console.log('creating DB', dbName);
};

//=================================================================================================================

export const exportDB = async ({ commit }, { dbName }) => {
	// TODO
	console.log('exporting DB', dbName);
};

//=================================================================================================================

export const deleteDB = async ({ commit }, { dbName }) => {
	// TODO
	console.log('deleting DB', dbName);
};
