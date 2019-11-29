'use strict';

import API from '../services/API';


const api = new API();

export const loadDatabases = async ({ commit, state }) => {
	console.log('[DISPATCH]', 'loadDatabases');
	if (state.databases.loaded) { return }

	commit('setDBsLoading');

	try {
		const { data } = await api.getAllDatabases();
		commit('setDBsLoaded');
		commit('setDatabases', data);
		commit('unsetDBsLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDBsLoading');
	}
};

//=================================================================================================================

export const loadDatabase = async ({ commit }, dbName) => {
	console.log('[DISPATCH]', 'loadDatabase', dbName);
	
	commit('setDBLoading');
	try {
		const { data } = await api.getDatabaseByID(dbName);
		commit('setDBLoaded');
		commit('setDatabase', data);
		commit('unsetDBLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDBLoading');
	}
};

//=================================================================================================================

export const loadCollections = async ({ commit }, dbName) => {
	console.log('[DISPATCH]', 'loadCollections', dbName);

	commit('setCollectionsLoading');
	try {
		const { data } = await api.getCollectionsByDBName(dbName);
		commit('setCollectionsLoaded');
		commit('setCollections', data);
		commit('unsetCollectionsLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetCollectionsLoading');
	}
};

//=================================================================================================================

export const loadCollection = async ({ commit }, { dbName, collectionName }) => {
	console.log('[DISPATCH]', 'loadCollection', dbName, collectionName);

	commit('setCollectionLoading');
	try {
		const { data } = await api.getCollectionByID(dbName, collectionName);
		commit('setCollectionLoaded');
		commit('setCollection', data);
		commit('unsetCollectionError');
		commit('unsetCollectionLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('setCollectionError', err);
		commit('unsetCollectionLoading');
	}
};

//=================================================================================================================

export const setDraftQueryProperty = ({ commit }, { key, value }) => { commit('setDraftQueryProperty', { key, value }) };
export const clearQuery  = ({ commit }) => { commit('clearQuery')  };
export const submitQuery = ({ commit }) => { commit('submitQuery') };

export const queryCollection = async ({ commit, state }, { dbName, collectionName }) => {
	const { pagination, currentQuery } = state.documents;

	commit('setDocumentsLoading');
	try {
		const response = await api.queryCollectionByID(dbName, collectionName, currentQuery, pagination);
		commit('setDocumentsLoaded');
		commit('setPagination', response.pagination);
		commit('setDocuments', response.data);
		commit('unsetDocumentsLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDocumentsLoading');
	}
};

export const queryPrevPage = ({ commit }) => { commit('setDocumentsPrevPage') };
export const queryNextPage = ({ commit }) => { commit('setDocumentsNextPage') };
export const queryPageByIndex = ({ commit }, index) => { commit('setDocumentsPageByIndex', index) };

export const loadDocument = async ({ commit }, { dbName, collectionName, id }) => {
	console.log('[DISPATCH]', 'loadDocument', dbName, collectionName, id);
	
	commit('setDocumentLoading');
	try {
		const { data } = await api.getDocumentByID(dbName, collectionName, id);
		commit('setDocumentLoaded');
		commit('setDocument', data);
		commit('unsetDocumentLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDocumentLoading');
	}
};

export const editDocument = ({ commit }, document) => { commit('setCurrentDocument', document) };
export const revertDocument = ({ commit }, document) => { commit('revertDocument', document) };

export const saveDocument = async ({ commit, state }, { dbName, collectionName, id = null }) => {
	const value = state.document.current;

	commit('setDocumentLoading');
	try {
		const { data } = await api.saveDocument(dbName, collectionName, id, value);
		commit('setDocumentLoaded');
		commit('setDocument', data);
		commit('unsetDocumentLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDocumentLoading');
	}
};

export const deleteDocument = async ({ commit }, { dbName, collectionName, id }) => {
	commit('setDocumentLoading');
	try {
		await api.deleteDocument(dbName, collectionName, id);
		commit('setDocumentLoaded');
		commit('setDocument', null);
		commit('unsetDocumentLoading');
	}
	catch(err) {
		// TODO: handle error
		console.error(err);
		commit('unsetDocumentLoading');
	}
};