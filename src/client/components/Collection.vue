<template>
<!-- <v-card tile>
	<v-toolbar flat>
		<v-spacer />
		<v-btn icon><v-icon>mdi-export</v-icon></v-btn>
		<v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
		<v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
	</v-toolbar> -->
<v-container fluid class="pt-0 white">
	<!-- <div class="text-end">
		<v-btn depressed color="primary"><v-icon small>mdi-plus</v-icon>document</v-btn>
		<v-btn depressed color="secondary"><v-icon small>mdi-plus</v-icon>index</v-btn>
	</div> -->
	<v-progress-linear indeterminate :active="loading" height="2" />
	<!-- <card-message v-if="loading" text="Loading collection..." /> -->
	<v-row v-if="error">
		<v-col>
			<v-alert type="error">{{ error }}</v-alert>
		</v-col>
	</v-row>
	<v-row v-else>
		<collection-actions-btn @document="createDocument" @export="exportCollection" @delete="deleteCollection" />
		<v-col class="pt-0">
			<v-tabs>
				<v-tab>Documents</v-tab>
				<v-tab>Indexes</v-tab>
				<v-tab>Stats</v-tab>

				<v-tab-item :transition="false" :reverse-transition="false">
					<document-list :db="db" :col="col" @query="fetchQueryResults" @previous="fetchPreviousPage" @next="fetchNextPage" @goto="fetchOnePage" />
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
<!-- </v-card> -->
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';
import CardMessage from '@/components/CardMessage.vue';
import IndexList from '@/components/IndexList.vue';
import CollectionActionsBtn from '@/components/CollectionActionsBtn.vue';
import CollectionStats from '@/components/CollectionStats.vue';
import DocumentList from '@/components/DocumentList.vue';

export default {
	props: {
		db: String,
		col: String,
	},
	components: { CardMessage, CollectionActionsBtn, DocumentList, IndexList, CollectionStats },
	data() { return {
	}},
	computed: mapState({
		error(state) { return state.collection.loadError },
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
			this.$store.dispatch('queryNextPage');
			this.fetchQueryResults();
		},
		fetchQueryResults() {
			const dbName = this.db;
			const collectionName = this.col;
			this.$store.dispatch('queryCollection', { dbName, collectionName });
		},
		createDocument() { console.log('createDocument') },
		exportCollection() { console.log('exportCollection') },
		deleteCollection() { console.log('deleteCollection') },
	},
	watch: {
		col() { this.fetchCollection() },
	},
	mounted() {
		this.fetchCollection();
	},
}
</script>