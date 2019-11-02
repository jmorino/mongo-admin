<template>
<v-card>
	<v-toolbar dense flat color="grey lighten-2">
		<v-toolbar-title class="subtitle-2">Documents ({{ total }})</v-toolbar-title>
		<v-spacer />
		<!-- <bar-pagination :page="page" :count="count" :total="total" /> -->
		<bar-pagination :start="start" :end="end" :total="total" @previous="previous" @next="next" @goto="goto" />
		<v-spacer />
		<!-- <v-divider class="mx-3" vertical /> -->
		<!-- <v-btn icon small class="me-2"><v-icon color="error">mdi-delete</v-icon></v-btn> -->
		<v-btn icon small class="me-0"><v-icon>mdi-plus</v-icon></v-btn>
	</v-toolbar>
	<v-progress-linear indeterminate :active="loading" height="2" />
	<!-- <card-message v-if="loading" text="Loading database stats..." /> -->

	<!-- <v-toolbar dense flat color="transparent">
		<v-spacer />
		<v-btn text><v-icon color="error">mdi-delete</v-icon>Delete all documents</v-btn>
	</v-toolbar> -->

	<v-data-table
		show-select
		hide-default-footer
		:hide-default-header="!total"
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
import CardMessage from '@/components/CardMessage.vue';

export default {
	components: { BarPagination, CardMessage },
	data() { return {
		search: null,
		selectedDocuments: [],
	}},
	computed: {
		...mapState({
			loading(state)  { return state.documents.loading },
			docs(state)  { return state.documents.all },
			// page(state)  { return state.documents.pagination.page },
			// count(state) { return state.documents.pagination.count },
			start(state)  { return state.documents.pagination.start },
			end(state) { return state.documents.pagination.end },
			total(state) { return state.documents.pagination.total },
		}),
		headers() {
			const tpl = this.docs[0];
			return tpl
				? Object.keys(tpl).map(key => ({ text: key, sortable: true, value: key, class: 'header-no-wrap' }))
				: [];
		},
	},
	methods: {
		previous() { console.log('previous'); this.$emit('previous', null) },
		next() { console.log('next'); this.$emit('next', null) },
		goto(index) { console.log('goto', index); this.$emit('goto', index) },
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