<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Indexes ({{ indexes.length }})</v-toolbar-title>
					<v-spacer />
					<bar-icon-action no-margin icon="mdi-plus" tooltip="New index" :disabled="loading" @click="$emit('index')" />
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<!-- <card-message v-if="loading" text="Loading collection indexes..." /> -->
				<card-message v-if="!indexes.length" text="No index in this collection" />
				<v-simple-table v-else>
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
						<tr v-for="index in indexes" :key="index.name">
							<td class="index-col">{{ index.name }}</td>
							<td class="index-col">
								{{ index.columns | flattenArray }}
							</td>
							<td class="index-col">{{ index.size | size }}</td>
							<td class="index-col">
								{{ index.attributes | flattenArray }}
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
import { mapState, mapGetters } from 'vuex';
import { size, flattenArray } from '../formatters';
import CardMessage from '@/components/CardMessage.vue';
import BarIconAction from '@/components/BarIconAction.vue';

export default {
	components: { CardMessage, BarIconAction },
	computed: mapGetters('collection', ['loading','indexes']),
	filters: { size, flattenArray },
}
</script>


<style lang="less">
.index-col-action {
	width: 3rem;
}
</style>