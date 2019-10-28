'use strict';


export default class API {
	
	async getAllDatabases() {
		return await this.request('/databases');
	};
	
	//=================================================================================================================


	//=============================================================================
	//=========================== Private Methods =================================
	//=============================================================================

	async request(path, method = 'get', body = null) {
		if (path.charAt(0) === '/') { path = path.slice(1) } // remove leading slash if any
		const url = `http://localhost:3000/api/${path}`;
		
		console.info(`[API] ${method.toUpperCase()} ${url}`, body);

		const response = await fetch(url, {
			method,
			body,
		});

		return await response.json();
	}
}