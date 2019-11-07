<template>
<v-app>
	<v-app-bar app dense clipped-left>
		<v-toolbar-title class="headline">
			<router-link :to="{ name: 'home' }" class="home-btn" ripple>
				<span class="secondary--text">MongoDB</span>
				<span class="primary--text">ADMIN</span>
			</router-link>
		</v-toolbar-title>
		<v-spacer />
		<v-breadcrumbs large :items="breadcrumbs">
			<template v-slot:divider>
				<v-icon>mdi-chevron-right</v-icon>
			</template>
		</v-breadcrumbs>
		<v-spacer />
	</v-app-bar>

	<v-content>
		<router-view />
	</v-content>
</v-app>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() { return {
	}},
	computed: {
		breadcrumbs(route) {
			const crumbs = [];
			const { db, col, id } = this.$route.params;
			
			if (db) {
				crumbs.push({
					text: db,
					exact: true,
					to: { name: 'database-overview', params: { db } },
				});
			}
			if (col) {
				crumbs.push({
					text: col,
					exact: true,
					to: { name: 'collection-overview', params: { db, col } },
				});
			}
			if (id) {
				crumbs.push({
					text: id,
					exact: true,
					to: { name: 'document', params: { db, col, id } },
				});
			}

			return crumbs;
		}
	},
}
</script>


<style lang="less">
.home-btn {
	text-decoration: none;
	text-transform: none;
}
.v-divider.v-divider--vertical {
	min-height: 60%;
	height: 60%;
	margin-top: auto;
	margin-bottom: auto;
}
</style>