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
