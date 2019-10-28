<template>
<v-container>
	<v-toolbar dense flat>
		<v-toolbar-title class="headline">Databases ({{dbs.length}})</v-toolbar-title>
		<v-spacer />
		<v-btn small icon><v-icon>mdi-plus</v-icon></v-btn>
	</v-toolbar>
				<v-divider />
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
				<!-- <v-toolbar dense flat color="secondary" dark>
					<v-toolbar-title>Databases ({{dbs.length}})</v-toolbar-title>
					<v-spacer />
					<v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
				</v-toolbar>

				<v-simple-table>
					<thead>
						<tr>
							<th>Name</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="db in dbs" :key="db.name">
							<td>
								<router-link :to="dbPageURL(db.name)">{{db.name}}</router-link>
							</td>
							<td class="text-right">
								<v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
							</td>
						</tr>
					</tbody>
				</v-simple-table> -->
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';

export default {
	data() { return {
	}},
	computed: mapState({
		dbs(state) { return state.databases.all },
	}),
	methods: {
		dbPageURL(dbName) {
			return { name: 'database-overview', params: { db: dbName } };
		},
	},
	filters: {
		size(size) {
			let factor = 0;
			while (size >= 1000) { size /= 1024, ++factor }
			const value = (Math.round(size * 10) / 10).toLocaleString();
			const unit = ['octets','ko','Mo','Go','To'][factor];

			return `${value} ${unit}`;
		}
	},
	// mounted() {
	// 	this.$store.dispatch('loadDatabases');
	// },
}
</script>