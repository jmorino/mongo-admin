'use strict';

import path from 'path';
import { parse } from 'json5';
import { readFileSync } from 'fs';
import SimpleSchema from 'simpl-schema';
import { env, DEVELOPMENT } from './env';
import { validate } from './utils/validation';


// Precedence order:
// ---
// 1. APP_SETTINGS env variable
// 2. APP_SETTINGS_URL env variable
// 3. ./settings.json file
// 4. defaults to {}
let _config = process.env.APP_SETTINGS;
if (typeof _config !== 'object') {
	console.log('[Config]', 'Environment variable APP_SETTINGS is not defined');

	let configURL = process.env.APP_SETTINGS_URL;
	if (!configURL) {
		console.log('[Config]', 'Environment variable APP_SETTINGS_URL is not defined');
		const configRoot = env === DEVELOPMENT ? '../..' : '.';
		configURL = path.resolve(__dirname, `${configRoot}/settings.json`);
		console.log('[Config]', 'Falling back to default settings file:', configURL);
	}

	try {
		_config = parse(readFileSync(path.resolve(configURL)));
	}
	catch(err) {
		console.warn('[Config]', 'Cannot load config file:', err.message);
		console.error(err.stack);
		console.log('[Config]', 'Falling back to empty config');
		_config = {};
	}
}


export const config = (entryName, schemaDef) => {
	if (!entryName) { return _config }
	if (!_config[entryName]) { throw new Error(`No "${entryName}" entry found in config file`) }
	if (!schemaDef) { return _config[entryName] }
	
	return validate(_config[entryName], schemaDef);
}
