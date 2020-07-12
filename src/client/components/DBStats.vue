<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-toolbar-title class="subtitle-2">Database Stats</v-toolbar-title>
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<card-message v-if="!stats" text="No database stats" />
				<v-list dense class="body-2" v-else>
					<v-list-item>
						<v-list-item-content class="font-weight-light">Collections (incl. system.namespaces)</v-list-item-content>
						<v-list-item-content>{{ stats.collections }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Data Size</v-list-item-content>
						<v-list-item-content>{{ stats.dataSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Storage Size</v-list-item-content>
						<v-list-item-content>{{ stats.storageSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Avg Obj Size #</v-list-item-content>
						<v-list-item-content>{{ stats.avgObjSize | size }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Objects #</v-list-item-content>
						<v-list-item-content>{{ stats.objects }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Extents #</v-list-item-content>
						<v-list-item-content>{{ stats.numExtents }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Indexes #</v-list-item-content>
						<v-list-item-content>{{ stats.indexes }}</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="font-weight-light">Index Size</v-list-item-content>
						<v-list-item-content>{{ stats.indexSize | size }}</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapGetters } from 'vuex';
import { size } from '../formatters';
import CardMessage from '@/components/CardMessage.vue';

export default {
	components: { CardMessage },
	computed: mapGetters('database', ['loading','stats']),
	filters: { size },
}
</script>