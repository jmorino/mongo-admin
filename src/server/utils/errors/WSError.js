'use strict';


export default class WSError extends Error {

	static extend(className, statusCode, statusMsg) {
		const defaultMessage = statusMsg || className;

		return class extends WSError {
			constructor(message, details) {
				super(statusCode, message || defaultMessage, details);
				this.name = className;
			}
		}
	}

	//=================================================================================================================

	constructor(statusCode, msg, details) {
		super(msg);
		this.statusCode = statusCode;
		this.details = details;
	}
}