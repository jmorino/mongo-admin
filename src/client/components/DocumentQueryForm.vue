<template>
<v-form autocomplete="off" @submit.prevent="submit">
	<v-card>
		<v-toolbar dense flat color="grey lighten-2">
			<v-spacer />
			<template v-if="queryIsActive">
				<v-btn text @click="$emit('clear')">Clear</v-btn>
				<v-divider vertical />
			</template>
			<v-btn text :disabled="!!queryErrors" type="submit">
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
							<v-combobox hide-details dense outlined label="Key" v-model="key" :items="fields" :rules="rules.key" />
						</v-col>
						<v-col>
							<v-text-field hide-details dense outlined label="Value" rows="5" v-model="value" :rules="rules.value" />
						</v-col>
						<v-col>
							<v-select hide-details dense outlined label="Value type" :items="queryDraft.types" v-model="type" />
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
			<v-tab-item :transition="false" :reverse-transition="false" vadlue="complex">
				<v-container fluid>
					<v-row>
						<v-col>
							<v-textarea hide-details outlined no-resize label="Query" rows="5" v-model="selector" :rules="rules.selector" />
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-card>
</v-form>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
	data() { return {
		rules: {
			key:      [() => this.queryErrors && this.queryErrors.key      || true],
			value:    [() => this.queryErrors && this.queryErrors.value    || true],
			selector: [() => this.queryErrors && this.queryErrors.selector || true],
		}
	}},
	computed: {
		...mapGetters('collection', ['fields']),
		...mapGetters('documents', ['queryIsActive','queryDraft','queryErrors']),
		queryType: {
			get() { return this.queryDraft.queryType === 'simple' ? 0 : 1 },
			set(value) { this.setDraftQueryProperty({ key: 'queryType', value: value === 0 ? 'simple': 'complex' }) },
		},
		key: {
			get() { return this.queryDraft.key },
			set(value) { this.setDraftQueryProperty({ key: 'key', value }) },
		},
		value: {
			get() { return this.queryDraft.value },
			set(value) { this.setDraftQueryProperty({ key: 'value', value }) },
		},
		type: {
			get() { return this.queryDraft.type },
			set(value) { this.setDraftQueryProperty({ key: 'type', value }) },
		},
		selector: {
			get() { return this.queryDraft.selector },
			set(value) { this.setDraftQueryProperty({ key: 'selector', value }) },
		},
	},
	methods: {
		...mapActions('documents', ['setDraftQueryProperty']),
		submit() {
			if (this.queryErrors) { return }
			this.$emit('submit')
		},
	}
}
</script> 