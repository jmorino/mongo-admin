<template>
<v-container fluid>
	<div class="text-end">
		<v-btn depressed color="primary"><v-icon small>mdi-plus</v-icon>document</v-btn>
		<v-btn depressed color="secondary"><v-icon small>mdi-plus</v-icon>index</v-btn>
	</div>
	<v-row>
		<v-col>
			<v-tabs>
				<v-tab>Documents</v-tab>
				<v-tab>Indexes</v-tab>
				<v-tab>Stats</v-tab>

				<v-tab-item :transition="false" :reverse-transition="false">
					<document-list />
				</v-tab-item>
				<v-tab-item :transition="false" :reverse-transition="false">
					<index-list />
				</v-tab-item>
				<v-tab-item :transition="false" :reverse-transition="false">
					<collection-stats />
				</v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';
import DocumentList from '@/components/DocumentList.vue';
import IndexList from '@/components/IndexList.vue';
import CollectionStats from '@/components/CollectionStats.vue';

export default {
	components: { DocumentList, IndexList, CollectionStats },
	data() { return {
	}},
	computed: mapState({
		collection(state) { return state.collections.current },
	}),
	// filters: { size },
	// methods: {
	// 	dbPageURL(dbName) {
	// 		return { name: 'database-overview', params: { db: dbName } };
	// 	},
	// },
	// mounted() {
	// 	this.$store.dispatch('loadDatabase', this.db);
	// },
}
</script>