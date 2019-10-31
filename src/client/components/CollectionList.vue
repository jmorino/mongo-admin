<template>
<v-navigation-drawer app clipped class="pa-0">
	<div class="d-flex flex-column overflow-hidden fill-height">
		<div class="flex-shrink-0">
			<v-toolbar dense flat dark color="secondary">
				<v-toolbar-title class="subtitle-2">Collections ({{collections.length}})</v-toolbar-title>
				<v-spacer />
				<v-btn icon small class="me-0"><v-icon>mdi-plus</v-icon></v-btn>
			</v-toolbar>
			<v-progress-linear indeterminate :active="loading" height="2" />
			<card-message v-if="loading" text="Loading collections..." />
		</div>
		<div class="flex-grow-1 overflow-auto">
			<v-list nav dense>
				<v-list-item-group color="primary">
					<v-list-item dense v-for="c in collections" :key="c.name" :to="collectionPageURL(c.name)">
						<v-list-item-content>
							<v-list-item-title>{{c.name}}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon small>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</div>
	</div>
</v-navigation-drawer>
</template>


<script>
import { mapState } from 'vuex';
import CardMessage from '@/components/CardMessage.vue';

export default {
	props: {
		db: String,
	},
	components: { CardMessage },
	computed: mapState({
		loading(state) { return state.collections.loading },
		collections(state) { return state.collections.all },
	}),
	methods: {
		collectionPageURL(collectionName) {
			return { name: 'collection-overview', params: { col: collectionName } };
		},
	},
	mounted() {
		this.$store.dispatch('loadCollections', this.db);
	},
}
</script>