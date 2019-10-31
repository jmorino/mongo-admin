<template>
<v-card>
	<v-toolbar dense flat color="grey lighten-2">
		<v-toolbar-title class="subtitle-2">Documents (2531)</v-toolbar-title>
		<v-spacer />
		<bar-pagination :page="1" :count="10" :total="2531" />
		<v-spacer />
		<!-- <v-divider class="mx-3" vertical /> -->
		<!-- <v-btn icon small class="me-2"><v-icon color="error">mdi-delete</v-icon></v-btn> -->
		<v-btn icon small class="me-0"><v-icon>mdi-plus</v-icon></v-btn>
	</v-toolbar>

	<!-- <v-toolbar dense flat color="transparent">
		<v-spacer />
		<v-btn text><v-icon color="error">mdi-delete</v-icon>Delete all documents</v-btn>
	</v-toolbar> -->

	<v-data-table
		hide-default-footer
		show-select
		item-key="_id"
		:headers="headers"
		:items="docs"
		v-model="selectedDocuments">

		<template v-slot:header.data-table-select="{ on, props }">
			<v-simple-checkbox v-bind="props" v-on="on" />
		</template>

		<template v-slot:item="{ item, headers, isSelected, select }">
			<tr>
				<td v-for="(k,i) in headers" :key="`${item._id}-${k.value}`">
					<v-simple-checkbox v-if="i === 0" :value="isSelected" @input="select($event)" />
					<div class="preview">{{ item[k.value] }}</div>
				</td>
			</tr>
		</template>

	</v-data-table>
</v-card>
</template>


<script>
import { mapState } from 'vuex';
import BarPagination from '@/components/BarPagination.vue';

export default {
	components: { BarPagination },
	data() { return {
		search: null,
		selectedDocuments: [],
	}},
	computed: {
		...mapState({
			docs(state) { return state.documents.all },
		}),
		headers() {
			const tpl = this.docs[0];
			return tpl
				? Object.keys(tpl).map(key => ({ text: key, sortable: true, value: key, class: 'header-no-wrap' }))
				: [];
		},
	},
}
</script>

<style lang="less">
.header-no-wrap { white-space: nowrap }
.preview {
	max-height: 4rem;
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: none;
	white-space: nowrap;
}
</style>