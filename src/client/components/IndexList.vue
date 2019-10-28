<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Indexes ({{ indexCount }})</v-toolbar-title>
				</v-toolbar>
				<v-divider />
				<v-simple-table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Columns</th>
							<th>Size</th>
							<th>Attributes</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(index, name) in indexes" :key="name">
							<td class="index-col">{{ name }}</td>
							<td class="index-col">
								{{ columns(index) | flattenArray }}
								<!-- <ul>
									<li v-for="col in columns(index)" :key="col.name">{{ col.name }} {{ col.order }}</li>
								</ul> -->
							</td>
							<td class="index-col">{{ indexSizes[name] | size }}</td>
							<td class="index-col">
								{{ attributes(index) | flattenArray }}
								<!-- <ul>
									<li v-for="{ key, value } in attributes(index)" :key="key">{{ key }}: {{ value }}</li>
								</ul> -->
							</td>
							<td class="index-col index-col-action">
								<v-btn small icon><v-icon>mdi-delete</v-icon></v-btn>
							</td>
						</tr>
					</tbody>
				</v-simple-table>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import { size } from '../formatters';
import { omit } from '../utils';

export default {
	data() { return {
	}},
	computed: {
		...mapState({
			stats(state) { return state.collections.current.stats },
		}),
		indexes()    { return this.stats.indexDetails },
		indexSizes() { return this.stats.indexSizes   },
		indexCount() { return this.stats.nindexes     },
	},
	filters: {
		size,
		flattenArray(arr) {
			return arr.map(({ key, value }) => `${key}: ${value}`).join(', ');
		}
	},
	methods: {
		dbPageURL(dbName) {
			return { name: 'database-overview', params: { db: dbName } };
		},
		columns(index) {
			const { key } = JSON.parse(index.metadata.infoObj);
			return Object.keys(key)
				.map(k => ({ key: k, value: key[k] > 0 ? 'ASC' : 'DESC' }));
		},
		attributes(index) {
			const details = JSON.parse(index.metadata.infoObj);
			const attributes = omit(details, ['v','key','name','ns']);
			return Object.keys(attributes).map(key => ({ key, value: attributes[key] }));
		},
	},
	// mounted() {
	// 	this.$store.dispatch('loadDatabase', this.db);
	// },
}
</script>


<style lang="less">
.index-col-action {
	width: 3rem;
}
</style>