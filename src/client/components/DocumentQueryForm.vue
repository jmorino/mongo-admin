<template>
<v-form autocomplete="off" @submit.stop="submit">
	<v-card>
		<v-toolbar dense flat color="grey lighten-2">
			<v-spacer />
			<template v-if="hasQuery">
				<v-btn text @click="$emit('clear')">Clear</v-btn>
				<v-divider vertical />
			</template>
			<v-btn text :disabled="!isValid" type="submit">
				<v-icon color="primary">mdi-flash</v-icon>Run query
			</v-btn>
		</v-toolbar>

		<v-tabs vertical background-color="grey lighten-2" v-model="queryType">
			<v-tab key="simple">Simple</v-tab>
			<v-tab key="complex">Complex</v-tab>

			<v-tab-item :transition="false" :reverse-transition="false" vadlue="simple">
				<v-container fluid>
					<v-row>
						<v-col>
							<v-combobox hide-details dense outlined label="Key" v-model="key" :items="fields" />
						</v-col>
						<v-col>
							<v-text-field hide-details dense outlined label="Value" rows="5" v-model="value" />
						</v-col>
						<v-col>
							<v-select hide-details dense outlined label="Value type" :items="types" v-model="type" />
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
			<v-tab-item :transition="false" :reverse-transition="false" vadlue="complex">
				<v-container fluid>
					<v-row>
						<v-col>
							<v-textarea hide-details outlined no-resize label="Query" rows="5" v-model="query" />
						</v-col>
						<v-col>
							<v-textarea hide-details outlined no-resize label="Projection" rows="5" v-model="projection" />
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-card>
</v-form>
</template>


<script>
import { mapActions, mapState } from 'vuex';
export default {
	data() { return {
		isValid: true,
	}},
	computed: {
		...mapState({
			hasQuery(state) { return !!state.documents.currentQuery.content },
			types(state)    { return state.documents.draftQuery.types },
			fields(state)   { return state.collection.current && state.collection.current.fields || [] },
		}),
		queryType: {
			get() { return this.$store.state.documents.draftQuery.queryType === 'simple' ? 0 : 1 },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'queryType', value: value === 0 ? 'simple': 'complex' }) },
		},
		key: {
			get() { return this.$store.state.documents.draftQuery.key },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'key', value }) },
		},
		value: {
			get() { return this.$store.state.documents.draftQuery.value },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'value', value }) },
		},
		type: {
			get() { return this.$store.state.documents.draftQuery.type },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'type', value }) },
		},
		query: {
			get() { return this.$store.state.documents.draftQuery.query },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'query', value }) },
		},
		projection: {
			get() { return this.$store.state.documents.draftQuery.projection },
			set(value) { this.$store.dispatch('setDraftQueryProperty', { key: 'projection', value }) },
		},
		// hasQuery() {
		// 	return this.queryType === 0
		// 		? !!(this.key || this.value)
		// 		: !!(this.query || this.projection);
		// },
	},
	methods: {
		validate() {
		},
		submit() {
			this.validate();
			this.$emit('submit')
		},
	}
}
</script> 