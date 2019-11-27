'use strict';

export const handleObject = callback => async (req, res, next) => {
	try {
		const data = await callback(req);
		if (data === undefined) {
			res.status(204).end();
		}
		else {
			res.json(data);
		}
	}
	catch(err) { next(err) }
}

//=================================================================================================================

export const handlePaginatedObject = callback => async (req, res, next) => {
	try {
		// const { start, end, total, items } = await callback(req);
		const { page, count, total, items } = await callback(req);

		// ensure response validity
		// if (start == null || end == null || total == null || items == null) { throw new Error('Invalid pagination structure') }
		if (page == null || count == null || total == null || items == null) { throw new Error('Invalid pagination structure') }

		// set specific headers
		res.set({
			'Access-Control-Expose-Headers' : 'Content-Range',
			// 'Content-Range' : `items ${start}-${end}/${total}`,
			'Content-Range' : `items ${page}-${count}/${total}`,
		});

		// send response
		res.json(items);
	}
	catch(err) { next(err) }
}

//=================================================================================================================

export const handleRawResponse = callback => async (req, res, next) => {
	try { await callback(req, res, next) }
	catch(err) { next(err) }
}

//=================================================================================================================

export const handleError = callback => (err, req, res, next) => {
	const result = callback(err, req);
	if (result === undefined) { return next(err) }

	const { statusCode, message, details } = result;
	res.status(statusCode);
	res.json({
		status: 'fail',
		message,
		details,
	});
}
