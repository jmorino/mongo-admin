<template>
<v-navigation-drawer app clipped class="pa-0">
	<div class="d-flex flex-column overflow-hidden fill-height">
		<v-toolbar dense flat dark color="secondary" class="flex-shrink-1">
			<v-toolbar-title class="subtitle-1">Collections ({{collections.length}})</v-toolbar-title>
			<v-spacer />
			<v-btn icon small><v-icon>mdi-plus</v-icon></v-btn>
		</v-toolbar>
		<div class="flex-grow-1 overflow-auto">
			<v-list nav dense>
				<v-list-item-group color="primary" :value="selection">
					<v-list-item dense v-for="c in collections" :key="c.name">
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
export default {
	data() { return {
		selection: 'BPMData',
	}},
	computed: mapState({
		collections(state) { return state.collections.all },
		collection(state) { return state.collections.current },
		// selection() { return this.collection.name }
	}),
	methods: {
		collectionPageURL(collectionName) {
			return { name: 'collection-overview', params: { col: collectionName } };
		},
	}
}
</script>