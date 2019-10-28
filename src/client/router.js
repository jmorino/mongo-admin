'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Databases from '@/views/Databases.vue';
import Database from '@/views/Database.vue';


Vue.use(Router);

export const router = new Router({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '',
			name: 'home',
			component: Databases,
		},
		{
			path: '/:db',
			name: 'database-overview',
			component: Database,
			props: true,
		},
		// {
		// 	path: '/:id',
		// 	name: 'details',
		// 	component: Details,
		// 	props: true,
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }
	],
});
