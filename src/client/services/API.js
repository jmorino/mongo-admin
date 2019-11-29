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
		const isQueryComplex = !!query.content && query.type === 'complex';
		const params = buildQueryParams(query, pagination);

		if (isQueryComplex) {
			return await this.post(`/api/databases/${db}/collections/${collection}/query`, query.content, params);
		}
		else {
			return await this.get(`/api/databases/${db}/collections/${collection}/documents`, params);
		}
	};
	
	//=================================================================================================================

	async getDocumentByID(db, collection, id) {
		return await this.get(`/api/databases/${db}/collections/${collection}/documents/${id}`);
	};
	
	//=================================================================================================================

	async saveDocument(db, collection, id, content) {
		if (id == null) {
			return await this.post(`/api/databases/${db}/collections/${collection}/documents`, content);
		}
		else {
			return await this.put(`/api/databases/${db}/collections/${collection}/documents/${id}`, content);
		}
	};
	
	//=================================================================================================================

	async deleteDocument(db, collection, id) {
		return await this.delete(`/api/databases/${db}/collections/${collection}/documents/${id}`);
	};
	

	//=============================================================================
	//=========================== Private Methods =================================
	//=============================================================================

	// aliases
	get   (path, params)       { return this.request(path, 'get',    null, params) }
	post  (path, body, params) { return this.request(path, 'post',   body, params) }
	put   (path, body, params) { return this.request(path, 'put',    body, params) }
	delete(path, body, params) { return this.request(path, 'delete', body, params) }


	async request(path, method = 'get', body = null, params = null) {
		const url = buildURL(path, 'http://localhost:3000', params);
		console.info(`[API] ${method.toUpperCase()} ${url}`, body || '-');

		const response = await fetch(url, { method, body });
		if (!response.ok) {
			console.error('response error', response)
			throw new Error('Request failed');
		} // TODO:

		const pagination = parseContentRange(response.headers.get('content-range'));
		const data = response.status === 204 ? null : await response.json();

		return { data, pagination };
	}
}