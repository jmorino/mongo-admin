'use strict';

import { parseContentRange, buildQueryParams, buildURL } from './helpers';
import { formatCollection } from './formatters';


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
		const { data } = await this.get(`/api/databases/${db}/collections/${collection}`);
		return { data: formatCollection(data) };
	};
	
	//=================================================================================================================

	async queryCollectionByID(db, collection, query, pagination) {
		const isQueryComplex = !!query.content && query.type === 'complex';
		const params = buildQueryParams(query, pagination);

		if (isQueryComplex) {
			return await this.post(`/api/databases/${db}/collections/${collection}/_query`, query.content, params);
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
			return await this.post(`/api/databases/${db}/collections/${collection}/documents/${id}`, content);
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
	get   (path,       params) { return this.request(path, 'get',    null, params) }
	post  (path, body, params) { return this.request(path, 'post',   body, params) }
	delete(path, body, params) { return this.request(path, 'delete', body, params) }


	async request(path, method = 'get', body = null, params = null) {
		// build url with params
		const url = buildURL(path, 'http://localhost:3000', params);
		console.info(`[API] ${method.toUpperCase()} ${url}`, body || '-');

		// set request headers
		const headers = {};
		if (body) { headers['Content-Type'] = 'application/json' }

		// send request
		const response = await fetch(url, { method, headers, body });
		if (!response.ok) {
			console.error('response error', response)
			throw new Error('Request failed');
		} // TODO:

		const pagination = parseContentRange(response.headers.get('content-range'));
		const data = response.status === 204 ? null : await response.json();

		return { data, pagination };
	}
}