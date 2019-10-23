'use strict';

import { config } from './config';
import * as mongodb from './db';


export default async () => {
	let server = null;
	const settings = config('server', {
		'host': { type: String, defaultValue: null },
		'port': { type: Number },
	});

	// connect to DB
	await mongodb.connect(() => {
		// handle connection failure
		throw new Error('MongoDBConnectionError');
	});

	// handle graceful shutdown
	process.on('SIGINT', async () => {
		console.log('[Server]', 'Stopping server...');

		// close server
		server.close();
		server = null;

		// disconnect from DB
		await mongodb.disconnect();
		
		console.log('[Server]', 'Server stopped');
		process.exit(0);
	});

	// load modules below asynchronously so we ensure all nested imports have been initialized
	// (eg. DB instance will be populated and the connection opens)
	const { app } = await import('./app');
	
	// start server
	const port = process.env.PORT || settings['port'];
	server = app.listen(port, settings['host'], () => console.log('[Server]', `Server running on port ${port}...`));
};