<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Collection Stats</v-toolbar-title>
				</v-toolbar>
				<v-divider />
				<v-list dense class="body-2">
					<v-list-item>
						<v-list-item-content class="font-weight-light">Documents</v-list-item-content>
						<v-list-item-content>{{ stats.count }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Capped</v-list-item-content>
						<v-list-item-content>{{ stats.capped }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Total doc size</v-list-item-content>
						<v-list-item-content>{{ stats.storageSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Average doc size</v-list-item-content>
						<v-list-item-content>{{ stats.size | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<!-- <v-list-item>
						<v-list-item-content class="font-weight-light">Pre-allocated size</v-list-item-content>
						<v-list-item-content>{{ stats.avgObjSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider /> -->
					<v-list-item>
						<v-list-item-content class="font-weight-light">Indexes</v-list-item-content>
						<v-list-item-content>{{ stats.nindexes }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Total index size</v-list-item-content>
						<v-list-item-content>{{ stats.totalIndexSize | size }}</v-list-item-content>
					</v-list-item>
					<!-- <v-divider /> -->
					<!-- <v-list-item>
						<v-list-item-content class="font-weight-light">Padding factor</v-list-item-content>
						<v-list-item-content>{{ stats.indexes }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Extents</v-list-item-content>
						<v-list-item-content>{{ stats.indexSize | size }}</v-list-item-content>
					</v-list-item> -->
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';

export default {
	data() { return {
	}},
	computed: mapState({
		stats(state) { return state.collections.current.stats },
	}),
	filters: { size },
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