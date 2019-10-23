'use strict';

import SimpleSchema from 'simpl-schema';
import { MongoClient } from 'mongodb';
import { config } from './config';


// validate config
const settings = config('db', {
	'host': { type: String, defaultValue: 'localhost' },
	'port': { type: SimpleSchema.Integer, defaultValue: 27017 },
	'name': { type: String },
	'appName': { type: String, defaultValue: 'digital-api' },
	'reconnectTries': { type: Number, defaultValue: 1 },
	'reconnectInterval': { type: Number, defaultValue: 3000 },
});


let _client = null;
let _db = null;
let _reconnectTimer = null;


const startReconnectTimer = callback => {
	const { reconnectTries, reconnectInterval } = settings;

	_reconnectTimer = setTimeout(() => {
		_reconnectTimer = null;
		callback();
	}, reconnectInterval * (reconnectTries + 1));
}

//=================================================================================================================

const stopReconnectTimer = () => {
	if (_reconnectTimer) {
		clearTimeout(_reconnectTimer);
		_reconnectTimer = null;
	}
}

//=============================================================================
//=========================== Exports =========================================
//=============================================================================


export const db = () => _db;
export const collection = (...args) => _db.collection(...args);

export const dropCollection = async collection => {
	try { await collection.drop() }
	catch(err) {
		if (err.codeName !== 'NamespaceNotFound') { throw err }
	}
};

//=================================================================================================================

export const connect = async callback => {
	const { appName, reconnectTries, reconnectInterval } = settings;
	const url = `mongodb://${settings.host}:${settings.port}/${settings.name}`;

	_client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		appname: appName,
		reconnectTries,
		reconnectInterval,
	});
	_db = _client.db(settings.name);
	
	console.log('[DB]', 'Connected to MongoDB at', url);
	
	// handle connection problems and reconnections
	_db.on('close', err => {
		if (!err) {
			console.log('[DB]', 'Connection closed');
		}
		else {
			console.log('[DB]', 'Connection lost:', err.message);

			startReconnectTimer(() => {
				console.error('[DB]', 'Connection definitely lost');
				callback();
			});
		}
	});

	_db.on('reconnect', () => {
		stopReconnectTimer();
		console.log('[DB]', 'Connection restored')
	});
};

//=================================================================================================================

export const disconnect = async () => {
	if (_client) {
		_client.isConnected() && await _client.close();
		_client = null;
	}

	if (_db) {
		_db.removeAllListeners('close');
		_db.removeAllListeners('reconnect');
		_db = null;
	}
};
