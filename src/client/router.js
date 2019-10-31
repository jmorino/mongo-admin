'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Databases from '@/views/Databases.vue';
import Database from '@/views/Database.vue';
import DBStats from '@/components/DBStats.vue';
import CollectionList from '@/components/CollectionList.vue';
import Collection from '@/components/Collection.vue';
import CollectionStats from '@/components/CollectionStats.vue';


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
			component: Database,
			props: true,
			children: [
				{
					path: '',
					name: 'database-overview',
					// props: true,
					// component: DBStats,
					props: { default: true, menu: true },
					components: {
						default: DBStats,
						menu: CollectionList,
					},
				},
				{
					path: ':col',
					name: 'collection-overview',
					// props: true,
					// component: Collection,
					props: { default: true, menu: true },
					components: {
						default: Collection,
						menu: CollectionList,
					},
				}
			],
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
