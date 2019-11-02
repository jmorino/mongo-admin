<template>
<v-container fluid class="pt-0">
	<!-- <div class="text-end">
		<v-btn depressed color="primary"><v-icon small>mdi-plus</v-icon>document</v-btn>
		<v-btn depressed color="secondary"><v-icon small>mdi-plus</v-icon>index</v-btn>
	</div> -->
	<!-- <v-progress-linear indeterminate :active="loading" height="2" />
	<card-message v-if="loading" text="Loading collection..." /> -->
	<v-row>
		<v-col class="pt-0">
			<v-tabs>
				<v-tab>Documents</v-tab>
				<v-tab>Indexes</v-tab>
				<v-tab>Stats</v-tab>

				<v-tab-item :transition="false" :reverse-transition="false">
					<query-form ref="query" @query="fetchQueryResults" />
					<query-results @previous="fetchPreviousPage" @next="fetchNextPage" @goto="fetchOnePage" />
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
import CardMessage from '@/components/CardMessage.vue';
import IndexList from '@/components/IndexList.vue';
import CollectionStats from '@/components/CollectionStats.vue';
import QueryForm from '@/components/DocumentQueryForm.vue';
import QueryResults from '@/components/DocumentQueryResults.vue';

export default {
	props: {
		db: String,
		col: String,
	},
	components: { CardMessage, QueryForm, QueryResults, IndexList, CollectionStats },
	data() { return {
	}},
	computed: mapState({
		loading(state) { return state.collection.loading },
		collection(state) { return state.collection.current },
	}),
	// filters: { size },
	methods: {
		async fetchCollection() {
			await this.$store.dispatch('loadCollection', { dbName: this.db, collectionName: this.col });
			this.fetchQueryResults();
		},
		resetQuery() {
			this.$ref['query'].reset();
			this.$store.dispatch('setQuery');
		},
		runQuery(query) {
			this.$store.dispatch('setQuery', query);
		},
		fetchOnePage(index) {
			this.$store.dispatch('queryPageByIndex', index);
			this.fetchQueryResults();
		},
		fetchPreviousPage() {
			this.$store.dispatch('queryPrevPage');
			this.fetchQueryResults();
		},
		fetchNextPage() {
			console.log('fetchNextPage')
			this.$store.dispatch('queryNextPage');
			this.fetchQueryResults();
		},
		fetchQueryResults() {
			const dbName = this.db;
			const collectionName = this.col;
			this.$store.dispatch('queryCollection', { dbName, collectionName });
		},
	},
	watch: {
		col() { this.fetchCollection() },
	},
	mounted() {
		this.fetchCollection();
	},
}
</script>