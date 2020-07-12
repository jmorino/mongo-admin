<template>
<v-container fluid>
	<v-row>
		<v-col>
			<query-form ref="query" @clear="clear" @submit="submit" />
		</v-col>
	</v-row>
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<bar-icon-action no-margin icon="mdi-refresh" tooltip="Actualiser" :disabled="loading" @click="refresh" />
					<template v-if="hasSelection">
						<v-divider vertical class="mx-2" />
						<bar-icon-action icon="mdi-download" tooltip="Exporter" @click="exportSelection" />
						<bar-icon-action icon="mdi-delete" tooltip="Supprimer" @click="deleteSelection" />
					</template>
					<v-spacer />
					<v-subheader v-if="queryIsActive">Documents are filtered by query</v-subheader>
					<bar-pagination :start="start" :end="end" :total="total" @previous="previous" @next="next" @goto="goto" />
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<v-data-table
					show-select
					hide-default-footer
					:hide-default-header="!documents.length"
					item-key="_id"
					:single-expand="false"
					:headers="headers"
					:items="documents"
					v-model="selection">

					<template v-slot:header.data-table-select="{ on, props }">
						<v-simple-checkbox v-bind="props" v-on="on" />
					</template>

					<template v-slot:item="{ item, headers, isSelected, select, isExpanded, expand }">
						<router-link tag="tr" :class="rowClasses(isSelected)" :to="documentPageURL(item)">
							<td>
								<v-simple-checkbox class="v-data-table__checkbox" :value="isSelected" @input="select($event)" />
							</td>
							<td class="no-wrap px-0">
								<v-btn icon @click.stop="deleteItem(item)"><v-icon>mdi-delete</v-icon></v-btn>
							</td>
							<td v-for="k in headers.slice(2)" :key="`${item._id}-${k.value}`">
								<div class="preview">{{ item[k.value] }}</div>
							</td>
						</router-link>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import BarPagination from '@/components/BarPagination.vue';
import BarIconAction from '@/components/BarIconAction.vue';
import CardMessage from '@/components/CardMessage.vue';
import QueryForm from '@/components/DocumentQueryForm.vue';


export default {
	props: {
		db: String,
		col: String,
	},
	components: { BarPagination, BarIconAction, CardMessage, QueryForm },
	data() { return {
		item: null,
		selection: [],
	}},
	computed: {
		...mapGetters('collection', ['rootFields']),
		...mapGetters('documents', ['loading','error','documents','page','count','total','queryIsActive']),
		hasSelection() { return !!this.selection.length },
		start() { return this.page * this.count },
		end()   { return this.start + this.documents.length },
		headers() {
			return [{ sortable: false }].concat(this.rootFields.map(key => ({ text: key, sortable: true, value: key, class: 'no-wrap' })));
		},
	},
	methods: {
		rowClasses(selected) {
			const classes = ['row-active'];
			selected && classes.push('blue', 'lighten-3');
			return classes;
		},
		documentPageURL(item) {
			return {
				name: 'document',
				params: { db: this.db, col: this.col, id: item._id },
			};
		},

		refresh() { console.log('refresh') },
		submit() { this.$emit('submit') },
		clear()  { this.$emit('clear') },
		previous()   { this.$emit('previous') },
		next()       { this.$emit('next') },
		goto(index)  { this.$emit('goto', index) },
		deleteItem(item) { console.log('delete', item._id) },
		deleteSelection() { console.log('delete all', this.selection) },
		exportSelection() { console.log('export all', this.selection) },
	}
}
</script>

<style lang="less">
.row-active { cursor: pointer }
.no-wrap { white-space: nowrap }
.preview {
	max-height: 4rem;
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: none;
	white-space: nowrap;
}
</style>