<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Collection Stats</v-toolbar-title>
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<card-message v-if="!stats" text="No collection stats" />
				<v-list dense class="body-2" v-else>
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
import { mapState, mapGetters } from 'vuex';
import { size } from '../formatters';
import CardMessage from '@/components/CardMessage.vue';

export default {
	components: { CardMessage },
	computed: mapGetters('collection', ['loading','stats']),
	filters: { size },
}
</script>