'use strict';

import API from '../../services/API';


export const loadCollections = async ({ commit }, { dbName }) => {
	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.getCollectionsByDBName(dbName);
		commit('setDBName', dbName);
		commit('setItems', data);
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

export const createCollection = async ({ commit, state }, { collectionName }) => {
	// TODO
	console.log('creating collection', collectionName);
};

//=================================================================================================================

export const exportCollection = async ({ commit, state }, { collectionName }) => {
	// TODO
	console.log('exporting collection', collectionName);
};

//=================================================================================================================

export const deleteCollection = async ({ commit, state }, { collectionName }) => {
	// TODO
	console.log('deleting collection', collectionName);
};
