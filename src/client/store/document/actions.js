'use strict';

import API from '../../services/API';


export const loadDocument = async ({ commit, getters }, { dbName, collectionName, id }) => {
	const isSameDocument = dbName === getters.db && collectionName === getters.collection && id === getters.id;
	if (isSameDocument) { return }

	// prepare a new document
	if (id === '$new') {
		commit('setDB', dbName);
		commit('setCollection', collectionName);
		commit('setID', null);
		commit('setDocument', {});
		return;
	}

	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.getDocumentByID(dbName, collectionName, id);
		commit('setDB', dbName);
		commit('setCollection', collectionName);
		commit('setID', id);
		commit('setDocument', data);
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

export const saveDocument = async ({ commit, getters }) => {
	commit('setLoading');
	try {
		const api = new API();
		const { data } = await api.saveDocument(getters.db, getters.collection, getters.id, getters.draft);
		commit('setID', data._id);
		commit('setDocument', data);
		commit('setLoadError', null);
		commit('unsetLoading');
		return data._id;
	}
	catch(err) {
		console.error(err);
		commit('setLoadError', err.message || err.name);
		commit('unsetLoading');
	}
};

//=================================================================================================================

export const deleteDocument = async ({ commit }, { dbName, collectionName, id }) => {
	commit('setLoading');
	try {
		const api = new API();
		await api.deleteDocument(dbName, collectionName, id);
		commit('setDB', null);
		commit('setCollection', null);
		commit('setID', null);
		commit('setDocument', null);
		commit('unsetLoaded');
	}
	catch(err) {
		console.error(err);
		commit('setLoadError', err.message || err.name);
	}
	commit('unsetLoading');
};

//=================================================================================================================

export const editDocument = ({ commit }, content) => {
	commit('editDocument', content);
};

//=================================================================================================================

export const revertDocument = ({ commit }) => {
	commit('revertDocument');
};
