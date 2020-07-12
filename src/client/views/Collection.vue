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
					<document-list :db="db" :col="col" @clear="resetQuery" @submit="submitQuery" @previous="loadPreviousPage" @next="loadNextPage" @goto="loadPageByDocumentIndex" />
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
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
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
	computed: {
		...mapGetters('collection', ['loading','error']),
		...mapGetters('documents', {
			'currentDB': 'db',
			'currentCollection': 'collection',
		}),
	},
	methods: {
		...mapActions('collection', ['loadCollection']),
		...mapActions('documents', [
			'setNamespace',
			'loadDocuments',
			'loadPageByDocumentIndex',
			'loadPreviousPage',
			'loadNextPage',
			'submitQuery',
			'resetQuery',
		]),
		...mapMutations('documents', ['setDB','setCollection']),
		async fetchCollection() {
			await this.loadCollection({ dbName: this.db, collectionName: this.col });
			
			// const isSameCollection = this.db === this.currentDB && this.col === this.currentCollection;
			// if (!isSameCollection) {
				this.setDB(this.db);
				this.setCollection(this.col);
				this.resetQuery();
			// }
		},
		createDocument() {
			this.$router.push({
				name: 'document',
				params: { db: this.db, col: this.col, id: '$new' },
			});
		},
		exportCollection() { console.log('exportCollection') },
		deleteCollection() { console.log('deleteCollection') },
	},
	watch: {
		$route() {
			this.fetchCollection();
		},
	},
	created() {
		this.fetchCollection();
	},
}
</script>