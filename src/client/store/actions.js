'use strict';

import API from '../services/API';


const api = new API();

export const loadDatabases = async ({ commit, state }) => {
	console.log('[DISPATCH]', 'loadDatabases');
	if (state.databases.loaded) { return }

	commit('setDBsLoading');

	try {
		const dbs = await api.getAllDatabases();
		commit('setDBsLoaded');
		commit('setDatabases', dbs);
		commit('unsetDBsLoading');
	}
	catch(err) {
		// TODO: handle error
		commit('unsetDBsLoading');
	}
};

//=================================================================================================================

export const loadDatabase = async ({ commit }, dbName) => {
	console.log('[DISPATCH]', 'loadDatabase', dbName);
	
	commit('setDBLoading');
	try {
		const db = await api.getDatabaseByID(dbName);
		commit('setDBLoaded');
		commit('setDatabase', db);
		commit('unsetDBLoading');
	}
	catch(err) {
		// TODO: handle error
		commit('unsetDBLoading');
	}
};

//=================================================================================================================

export const loadCollections = async ({ commit }, dbName) => {
	console.log('[DISPATCH]', 'loadCollections', dbName);

	commit('setCollectionsLoading');
	try {
		const collections = await api.getCollectionsByDBName(dbName);
		commit('setCollectionsLoaded');
		commit('setCollections', collections);
		commit('unsetCollectionsLoading');
	}
	catch(err) {
		// TODO: handle error
		commit('unsetCollectionsLoading');
	}
};