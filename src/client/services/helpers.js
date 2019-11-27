'use strict';


export const parseContentRange = contentRange => {
	const tokens = /^items (\d+)-(\d+)\/(\d+)/.exec(contentRange);
	if (!tokens) { return {} }

	// const [_, start, end, total] = tokens;
	// return { start: +start, end: +end, total: +total };
	const [_, page, count, total] = tokens;
	return { page: +page, count: +count, total: +total };
};

//=================================================================================================================

export const buildQueryParams = (query, pagination) => {
	const params = new URLSearchParams();
	params.append('p', pagination.page);
	params.append('c', pagination.count);

	if (query.key) { params.append(query.key, query.value) }

	return params;
};

//=================================================================================================================

export const buildURL = (path, domain, params = null) => {
	const url = new URL(path, domain);
	
	// copy URL query params
	if (params) { params.forEach((v, k) => url.searchParams.append(k, v)) }

	return url;
};