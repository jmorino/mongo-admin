<template>
<div>
	<collection-list />
	<router-view />
</div>
</template>


<script>
import { mapState } from 'vuex';
import CollectionList from '@/components/CollectionList.vue';
import DBStats from '@/components/DBStats.vue';
import Collection from '@/components/Collection.vue';

export default {
	components: {
		'collection-list': CollectionList,
		'db-stats': DBStats,
		'collection': Collection,
	},
	data() { return {
	}},
	computed: mapState({
		db(state)  { return state.databases.current },
		dbs(state) { return state.databases.all },
	}),
	methods: {
		dbPageURL(dbName) {
			return { name: 'database-overview', params: { db: dbName } };
		},
	},
	// mounted() {
	// 	this.$store.dispatch('loadDatabase', this.db);
	// },
}
</script>