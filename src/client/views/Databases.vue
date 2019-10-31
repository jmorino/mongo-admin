<template>
<v-container>
	<v-card class="mt-4">
		<v-toolbar dense flat color="grey lighten-2">
			<v-toolbar-title class="subtitle-2">Databases ({{dbs.length}})</v-toolbar-title>
			<v-spacer />
			<v-btn icon small class="me-0"><v-icon>mdi-plus</v-icon></v-btn>
		</v-toolbar>
		<v-progress-linear indeterminate :active="loading" height="2" />
		<v-card-text>
			<p class="text-center ma-4" v-if="!dbs.length">No database</p>
			<v-row>
				<v-col v-for="db in dbs" :key="db.name" cols="12" sm="6" md="4" lg="3">
					<v-card :to="dbPageURL(db.name)">
						<v-card-title><h5>{{ db.name }}</h5></v-card-title>
						<v-divider />
						<v-list dense class="body-2">
							<v-list-item>
								<v-list-item-content class="font-weight-light">Size on disk:</v-list-item-content>
								<v-list-item-content class="text-end">{{ db.sizeOnDisk | size }}</v-list-item-content>
							</v-list-item>
							<v-list-item>
								<v-list-item-content class="font-weight-light">Empty:</v-list-item-content>
								<v-list-item-content class="text-end">{{ db.empty }}</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-card>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';

export default {
	data() { return {
	}},
	computed: mapState({
		loading(state) { return state.databases.loading },
		dbs(state) { return state.databases.all },
	}),
	filters: { size },
	methods: {
		dbPageURL(dbName) {
			return { name: 'database-overview', params: { db: dbName } };
		},
	},
	created() {
		this.$store.dispatch('loadDatabases');
	},
}
</script>