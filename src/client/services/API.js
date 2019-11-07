'use strict';

import { parseContentRange, buildQueryParams, buildURL } from './helpers';


export default class API {
	
	async getAllDatabases() {
		return await this.get('/api/databases');
	};
	
	//=================================================================================================================

	async getDatabaseByID(db) {
		return await this.get(`/api/databases/${db}`);
	};
	
	//=================================================================================================================

	async getCollectionsByDBName(db) {
		return await this.get(`/api/databases/${db}/collections`);
	};
	
	//=================================================================================================================

	async getCollectionByID(db, collection) {
		return await this.get(`/api/databases/${db}/collections/${collection}`);
	};
	
	//=================================================================================================================

	async queryCollectionByID(db, collection, query, pagination) {
		const params = buildQueryParams(query, pagination);
		console.log(params.toString())
		return await this.get(`/api/databases/${db}/collections/${collection}/documents`, params);
	};
	
	//=================================================================================================================

	async getDocumentByID(db, collection, id) {
		return await this.get(`/api/databases/${db}/collections/${collection}/documents/${id}`);
	};
	

	//=============================================================================
	//=========================== Private Methods =================================
	//=============================================================================

	// aliases
	get(path, params) { return this.request(path, 'get', null, params) }


	async request(path, method = 'get', body = null, params = null) {
		const url = buildURL(path, 'http://localhost:3000', params);
		console.info(`[API] ${method.toUpperCase()} ${url}`, body || '-');

		const response = await fetch(url, { method, body });
		if (!response.ok) {
			console.error('response error', response)
			throw new Error('Request failed');
		} // TODO:

		const pagination = parseContentRange(response.headers.get('content-range'));
		const data = await response.json();

		return { data, pagination };
	}
}