<template>
<div>
	<collection-list />
	<v-container fluid class="pa-0">
		<v-row>
			<v-col class="pt-0">
				<!-- <v-toolbar dense flat color="secondary" dark>
					<v-toolbar-title class="subtitle-1">{{ db.name }}</v-toolbar-title>
				</v-toolbar> -->

				<collection />
				<!-- <db-stats /> -->
			</v-col>
		</v-row>
	</v-container>
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