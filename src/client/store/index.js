'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

import * as databases from './databases';
import * as database from './database';
import * as collections from './collections';
import * as collection from './collection';
import * as documents from './documents';
import * as document from './document';


Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		databases,
		database,
		collections,
		collection,
		documents,
		document,
	}
});
