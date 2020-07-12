'use strict';

import API from '../../services/API';


export const loadDocuments = async ({ commit, state }) => {
	commit('setLoading');
	try {
		const api = new API();
		const response = await api.queryCollectionByID(state.db, state.collection, state.query, state.pagination);
		commit('setPagination', response.pagination);
		commit('setDocuments', response.data);
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

export const loadPageByDocumentIndex = ({ dispatch, commit, getters }, index) => {
	commit('setPagination', { page: parseInt(index / getters.count) });
	return dispatch('loadDocuments');
};

//=================================================================================================================

export const loadPreviousPage = ({ dispatch, commit, getters }) => {
	commit('setPagination', { page: getters.page - 1 });
	return dispatch('loadDocuments');
};

//=================================================================================================================

export const loadNextPage = ({ dispatch, commit, getters }) => {
	commit('setPagination', { page: getters.page + 1 });
	return dispatch('loadDocuments');
};

//=================================================================================================================

export const setDraftQueryProperty = ({ commit }, { key, value }) => {
	commit('setDraftQueryProperty', { key, value });
};

//=================================================================================================================

export const resetQuery = ({ dispatch, commit }) => {
	commit('setQuery', null);
	commit('setPagination', { page: 0 });
	return dispatch('loadDocuments');
};

//=================================================================================================================

export const submitQuery = ({ dispatch, commit, getters }) => {
	const newQuery = getters.validatedQuery;
	if (!newQuery) { return }

	commit('setQuery', newQuery);
	commit('setPagination', { page: 0 });
	return dispatch('loadDocuments');
};
