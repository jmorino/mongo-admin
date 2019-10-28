<template>
<v-container fluid class="px-0">
	<v-row>
		<v-col>
			<v-card>
				<v-toolbar dense flat color="grey lighten-2">
					<v-spacer />
					<v-btn text @click="runQuery">
						<v-icon color="primary">mdi-flash</v-icon>Run query
					</v-btn>
				</v-toolbar>

				<v-tabs vertical background-color="grey lighten-2" v-model="tabIndex">
					<v-tab>Simple</v-tab>
					<v-tab>Complex</v-tab>

					<v-tab-item :transition="false" :reverse-transition="false">
						<v-container fluid>
							<v-row>
								<v-col>
									<v-text-field hide-details dense outlined label="Key" rows="5" autofocus v-model="simple.key" />
								</v-col>
								<v-col>
									<v-text-field hide-details dense outlined label="Value" rows="5" v-model="simple.value" />
								</v-col>
								<v-col>
									<v-select hide-details dense outlined label="Value type" :items="valueTypes" v-model="simple.type" />
								</v-col>
							</v-row>
						</v-container>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-container fluid>
							<v-row>
								<v-col>
									<v-textarea hide-details outlined no-resize label="Query" rows="5" autofocus v-model="complex.query" />
								</v-col>
								<v-col>
									<v-textarea hide-details outlined no-resize label="Projection" rows="5" v-model="complex.projection" />
								</v-col>
							</v-row>
						</v-container>
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
export default {
	data() {
		const valueTypes = ['String','RegEx','Boolean','Number','Date'];

		return {
			tabIndex: 0,
			valueTypes,
			simple: {
				key: null,
				value: null,
				type: valueTypes[0],
			},
			complex: {
				query: null,
				projection: null,
			}
		}
	},
	methods: {
		runQuery() {
			const query = this.tabIndex === 0 ? { ...this.simple } : { ...this.complex };
			this.$emit('query', query);
		},
	},
}
</script>