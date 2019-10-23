'use strict';

import path from 'path';
import express from 'express';
import { env, DEVELOPMENT } from './env';


export default ({ dir, ...settings } = {}) => {
	if (env === DEVELOPMENT) {
		return (req, res, next) => {
			res.send('No static data in dev mode');
		}
	}
	else {
		return express.static(path.resolve(__dirname, dir), settings);
	}
}