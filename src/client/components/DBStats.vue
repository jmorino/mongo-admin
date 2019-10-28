<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Database Stats</v-toolbar-title>
				</v-toolbar>
				<v-divider />
				<v-list dense class="body-2">
					<v-list-item>
						<v-list-item-content class="font-weight-light">Collections (incl. system.namespaces)</v-list-item-content>
						<v-list-item-content>{{ db.stats.collections }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Data Size</v-list-item-content>
						<v-list-item-content>{{ db.stats.dataSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Storage Size</v-list-item-content>
						<v-list-item-content>{{ db.stats.storageSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Avg Obj Size #</v-list-item-content>
						<v-list-item-content>{{ db.stats.avgObjSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Objects #</v-list-item-content>
						<v-list-item-content>{{ db.stats.objects }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Extents #</v-list-item-content>
						<v-list-item-content>{{ db.stats.numExtents }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Indexes #</v-list-item-content>
						<v-list-item-content>{{ db.stats.indexes }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Index Size</v-list-item-content>
						<v-list-item-content>{{ db.stats.indexSize | size }}</v-list-item-content>
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

export default {
	data() { return {
	}},
	computed: mapState({
		db(state) { return state.databases.current },
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