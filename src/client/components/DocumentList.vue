<template>
<v-container>
	<v-row>
		<v-col>
			<query-form ref="query" @query="query" />
		</v-col>
	</v-row>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat :color="hasSelection && false ? 'grey darken-2' : 'grey lighten-2'" :dadrk="hasSelection">
					<v-toolbar-title class="subtitle-2">Documents ({{ total }})</v-toolbar-title>
					<v-spacer />
					<v-fade-transition>
						<v-btn v-if="hasSelection" text @click="deleteSelection">
							<v-icon color="red lighten-1">mdi-delete</v-icon>Supprimer ({{ selection.length }})
						</v-btn>
					</v-fade-transition>
					<v-spacer />
					<bar-pagination class="me-2" :start="start" :end="end" :total="total" @previous="previous" @next="next" @goto="goto" />
					<v-btn icon small class="me-0"><v-icon>mdi-plus</v-icon></v-btn>
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />

				<document />
				<v-data-table
					show-select
					hide-default-footer
					:hide-default-header="!total"
					item-key="_id"
					:single-expand="false"
					:headers="headers"
					:items="docs"
					v-model="selection">

					<template v-slot:header.data-table-select="{ on, props }">
						<v-simple-checkbox v-bind="props" v-on="on" />
					</template>

					<template v-slot:item="{ item, headers, isSelected, select, isExpanded, expand }">
						<tr :class="isSelected ? 'blue lighten-3' : ''">
							<td>
								<v-simple-checkbox class="v-data-table__checkbox" :value="isSelected" @input="select($event)" />
							</td>
							<td class="header-no-wrap px-0">
								<v-btn small icon :to="documentPageURL(item)"><v-icon color="primary">mdi-eye</v-icon></v-btn>
								<v-btn small icon @click="deleteItem(item)"><v-icon color="red lighten-1">mdi-delete</v-icon></v-btn>
							</td>
							<td v-for="k in headers.slice(2)" :key="`${item._id}-${k.value}`">
								<div class="preview">{{ item[k.value] }}</div>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState } from 'vuex';
import BarPagination from '@/components/BarPagination.vue';
import CardMessage from '@/components/CardMessage.vue';
import Document from '@/components/Document.vue';
import QueryForm from '@/components/DocumentQueryForm.vue';
import QueryResults from '@/components/DocumentQueryResults.vue';


export default {
	props: {
		db: String,
		col: String,
	},
	components: { Document, BarPagination, CardMessage, QueryForm, QueryResults },
	data() { return {
		item: null,
		selection: [],
	}},
	computed: {
		hasSelection() { return !!this.selection.length },
		...mapState({
			loading(state)  { return state.documents.loading },
			docs(state)  { return state.documents.all },
			start(state)  { return state.documents.pagination.start },
			end(state) { return state.documents.pagination.end },
			total(state) { return state.documents.pagination.total },
		}),
		headers() {
			const tpl = this.docs[0];
			return [{ sortable: false }].concat(tpl
				? Object.keys(tpl).map(key => ({ text: key, sortable: true, value: key, class: 'header-no-wrap' }))
				: []);
		},
	},
	methods: {
		query(query) { this.$emit('query', query) },
		previous()   { this.$emit('previous') },
		next()       { this.$emit('next') },
		goto(index)  { this.$emit('goto', index) },
		// open(item)   { this.$store.dispatch('editDocument', item) }
		documentPageURL(item) {
			console.log(this.db, this.col);
			return {
				name: 'document',
				params: { db: this.db, col: this.col, id: item._id },
			};
		},
		open(item)   { this.$router.push(this.documentPageURL(item)) },
		deleteItem(item) { console.log('delete', item._id) },
		deleteSelection() { console.log('delete all', this.selection) },
	}
}
</script>

<style lang="less">
.active-row { cursor: pointer }
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