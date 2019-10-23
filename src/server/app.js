'use strict';

import { config } from './config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import serveStatic from './static';
import { catchUnhandled } from './middlewares/catch-unhandled';
import { middlewares as errorMiddlewares } from './middlewares/errors';
import { router } from './api';


const settings = config('server', {
	'log-format': { type: String, defaultValue: ':date[iso] :method :url :status :response-time ms - :res[content-length]' },
	'json': { type: Object, blackbox: true, defaultValue: {} },
	'cors': { type: Object, blackbox: true, defaultValue: {} },
	'gzip': { type: Object, blackbox: true, defaultValue: {} },
	'static': { type: Object, blackbox: true, defaultValue: {} },
});


export const app = express();

app.use(morgan(settings['log-format']));
app.use(cors(settings['cors']));
app.use(compression(settings['gzip']));
app.use(bodyParser.json(settings['json']));

// use API router
app.use('/api', router);

// serve static files
app.use('/', serveStatic(settings['static']));

// use catch-all middleware at last (basically, returns a 404 error)
app.use(catchUnhandled);

// use all exported error middlewares
errorMiddlewares.forEach(middleware => app.use(middleware));
