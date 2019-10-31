<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Database Stats</v-toolbar-title>
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<card-message v-if="loading" text="Loading database stats..." />
				<v-list dense class="body-2" v-if="database">
					<v-list-item>
						<v-list-item-content class="font-weight-light">Collections (incl. system.namespaces)</v-list-item-content>
						<v-list-item-content>{{ database.stats.collections }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Data Size</v-list-item-content>
						<v-list-item-content>{{ database.stats.dataSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Storage Size</v-list-item-content>
						<v-list-item-content>{{ database.stats.storageSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Avg Obj Size #</v-list-item-content>
						<v-list-item-content>{{ database.stats.avgObjSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Objects #</v-list-item-content>
						<v-list-item-content>{{ database.stats.objects }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Extents #</v-list-item-content>
						<v-list-item-content>{{ database.stats.numExtents }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Indexes #</v-list-item-content>
						<v-list-item-content>{{ database.stats.indexes }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Index Size</v-list-item-content>
						<v-list-item-content>{{ database.stats.indexSize | size }}</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';
import CardMessage from '@/components/CardMessage.vue';

export default {
	props: {
		db: String,
	},
	components: { CardMessage },
	data() { return {
	}},
	computed: mapState({
		loading(state) { return state.database.loading },
		database(state) { return state.database.current },
	}),
	filters: { size },
	methods: {
		dbPageURL(dbName) {
			return { name: 'database-overview', params: { db: dbName } };
		},
	},
	mounted() {
		this.$store.dispatch('loadDatabase', this.db);
	},
}
</script>