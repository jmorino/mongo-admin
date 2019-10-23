'use strict';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import fr from 'vuetify/es5/locale/fr';


Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
	lang: {
		locales: { fr },
		current: 'fr'
	},
	theme: {
		dark: false,
		themes: {},
	},
	// options: {
	// 	customProperties: true
	// },
});
