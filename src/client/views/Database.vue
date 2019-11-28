<template>
<div>
	<!-- <collection-list :db="db" /> -->
	<router-view name="menu" />
	<router-view class="fill-height" />
</div>
</template>


<script>
import { mapState } from 'vuex';
import CollectionList from '@/components/CollectionList.vue';
import DBStats from '@/components/DBStats.vue';
import Collection from '@/components/Collection.vue';

export default {
	props: {
		db: String,
	},
	components: {
		'collection-list': CollectionList,
		'db-stats': DBStats,
		'collection': Collection,
	},
	data() { return {
	}},
	computed: mapState({
		loading(state)  { return state.database.loading },
		database(state)  { return state.database.current },
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