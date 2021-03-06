'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Databases from '@/views/Databases.vue';
import Database from '@/views/Database.vue';
import DBStats from '@/components/DBStats.vue';
import Collections from '@/views/Collections.vue';
import Collection from '@/views/Collection.vue';
import Document from '@/views/Document.vue';

import { store } from './store';

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
					props: true,
					component: DBStats,
					// props: { default: true, menu: true },
					// components: {
					// 	default: DBStats,
					// 	// menu: Collections,
					// },
				},
				{
					path: ':col',
					name: 'collection-overview',
					props: true,
					component: Collection,
					// props: { default: true, menu: true },
					// components: {
					// 	default: Collection,
					// 	// menu: Collections,
					// },
					// children: [
					// 	{
					// 		path: '',
					// 		props: true,
					// 		component: CollectionLayout,
					// 		children: [
					// 			{
					// 				path: '',
					// 				name: 'collection-overview',
					// 				props: true,
					// 				component: DocumentList,
					// 			},
					// 			{
					// 				path: 'indexes',
					// 				name: 'collection-indexes',
					// 				props: true,
					// 				component: IndexList,
					// 			},
					// 			{
					// 				path: 'stats',
					// 				name: 'collection-details',
					// 				props: true,
					// 				component: CollectionStats,
					// 			},
					// 		],
					// 	},
					// 	{
					// 		path: 'document/:id',
					// 		name: 'document',
					// 		props: true,
					// 		component: Document,
					// 	}
					// ]
				},
				{
					path: ':col/:id',
					name: 'document',
					// props: true,
					// component: Collection,
					props: { default: true, menu: true },
					components: {
						default: Document,
						menu: Collections,
					},
				},
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